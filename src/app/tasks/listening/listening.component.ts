import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import {NgIf} from '@angular/common';
import {TuiButton, TuiIcon} from '@taiga-ui/core';
import {TuiTextareaModule} from '@taiga-ui/legacy';
import {FormsModule} from '@angular/forms';
import {TuiMedia} from '@taiga-ui/cdk';
import {compareTwoStrings} from 'string-similarity';
import {SnackBarService} from '../../../shared/services/snack-bar.service';
import {
  SpeechRecognition,
  SpeechRecognitionConstructor,
  SpeechRecognitionErrorEvent,
  SpeechRecognitionEvent,
} from '../../../shared/interfaces/SpeechRecognition';

@Component({
  selector: 'listening',
  standalone: true,
  templateUrl: './listening.component.html',
  styleUrl: './listening.component.scss',
  imports: [NgIf, TuiButton, TuiIcon, TuiTextareaModule, FormsModule, TuiMedia],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListeningComponent implements OnInit, OnDestroy {
  @Output() answer = new EventEmitter<{answer: [string, string][]; isCorrect: boolean}>();
  @Input() task: any;

  private recognition: SpeechRecognition | null = null;

  protected isSpeaking: WritableSignal<boolean> = signal(false);
  protected recognizedText: WritableSignal<string> = signal('');
  protected interimText: WritableSignal<string> = signal('');
  protected isSupported: WritableSignal<boolean> = signal(true);

  protected currentTime: number = 0;
  protected paused: boolean = true;

  protected get icon(): string {
    return this.paused ? '@tui.play' : '@tui.pause';
  }

  constructor(private readonly snackBarService: SnackBarService) {}

  ngOnInit(): void {
    this.checkSupportAndInitialize();
  }

  ngOnDestroy(): void {
    if (this.recognition) {
      this.recognition.stop();
      this.recognition = null;
    }
  }

  private checkSupportAndInitialize(): void {
    const SpeechRecognition: SpeechRecognitionConstructor | undefined =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.isSupported.set(false);
      this.snackBarService.warningShow('Ваш браузер не поддерживает Web Speech API.');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = this.task.recognitionLang;

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        const newFinalText = this.capitalizeFirstLetter(finalTranscript.trim());
        this.recognizedText.update((text) => (text ? text + ' ' : '') + newFinalText);
        this.interimText.set('');
        this.checkAnswer();
      }
      this.interimText.set(interimTranscript);
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const errorMessages: Record<string, string> = {
        'no-speech': 'Речь не распознана.',
        'audio-capture': 'Ошибка захвата звука. Проверьте микрофон.',
        'not-allowed': 'Доступ к микрофону запрещен. Разрешите доступ в настройках браузера.',
        network: 'Проблема с сетью. Распознавание может требовать подключения к интернету.',
      };
      this.snackBarService.warningShow(errorMessages[event.error] || 'Произошла ошибка распознавания.');
      this.stopListening();
    };

    this.recognition.onend = () => {
      this.isSpeaking.set(false);
      this.checkAnswer();
    };

    this.recognition.onstart = () => {
      this.isSpeaking.set(true);
    };
  }

  protected toggleListening(): void {
    this.paused = !this.paused;
  }

  protected toggleSpeaking(): void {
    if (!this.isSupported() || !this.recognition) {
      return;
    }
    this.isSpeaking() ? this.stopListening() : this.startListening();
  }

  protected handleTextInput(newText: string): void {
    this.recognizedText.set(newText);
    this.interimText.set('');
    this.checkAnswer();
  }

  // TODO вернуться к реализации проверки
  protected checkAnswer(): void {
    const isCorrect: boolean =
      compareTwoStrings(this.recognizedText().trim().toLowerCase(), this.task.correctAnswer[0].toLowerCase()) > 0.9;

    this.answer.emit({
      answer: [[this.recognizedText().trim().toLowerCase(), this.task.correctAnswer[0].toLowerCase()]],
      isCorrect,
    });
  }

  private startListening(): void {
    if (!this.isSpeaking() && this.recognition) {
      this.recognizedText.set('');
      this.interimText.set('');
      try {
        this.recognition.start();
      } catch (e) {
        this.snackBarService.warningShow('Не удалось начать запись. Проверьте разрешения для микрофона.');
        this.isSpeaking.set(false);
      }
    }
  }

  private stopListening(): void {
    if (this.isSpeaking() && this.recognition) {
      this.recognition.stop();
      this.isSpeaking.set(false);
    }
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
