import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiMedia} from '@taiga-ui/cdk';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {TuiSkeleton} from '@taiga-ui/kit';
import {NgForOf} from '@angular/common';
import {TuiCardLarge} from '@taiga-ui/layout';
import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'audio-translation',
  standalone: true,
  templateUrl: './audio-translation.component.html',
  styleUrl: './audio-translation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, TuiButton, TuiMedia, NgForOf, TuiAppearance, TuiCardLarge, DragDropModule, TuiSkeleton],
})
export class AudioTranslationComponent {
  // TODO вернуться к типизации
  @Output() answer = new EventEmitter<{answer: [string, string][]; isCorrect: boolean}>();
  @Input() task: any;

  protected currentTime: number = 0;
  protected paused: boolean = true;

  protected get icon(): string {
    return this.paused ? '@tui.play' : '@tui.pause';
  }

  protected selectedOptions: WritableSignal<string[]> = signal<string[]>([]);
  protected availableOptions: Signal<string[]> = computed(() =>
    this.task.options.filter((option: string) => !this.selectedOptions().includes(option)),
  );
  protected hasSelectedOption: Signal<boolean> = computed(() => this.selectedOptions().length > 0);

  protected selectOption(option: string): void {
    this.selectedOptions.update((options: string[]) => [...options, option]);
  }

  protected removeOption(index: number): void {
    this.selectedOptions.update((options: string[]) => options.filter((_, i) => i !== index));
  }

  protected drop(event: CdkDragDrop<string[]>): void {
    this.selectedOptions.update((options: string[]) => {
      moveItemInArray([...options], event.previousIndex, event.currentIndex);
      return [...options];
    });
  }

  protected toggleState(): void {
    this.paused = !this.paused;
  }

  // TODO вернуться к реализации проверки
  public checkAnswer(): void {
    const isCorrect: boolean = JSON.stringify(this.selectedOptions()) === JSON.stringify(this.task.correctAnswer);
    this.answer.emit({
      answer: this.selectedOptions().map((word, i) => [word, this.task.correctAnswer[i] || '']),
      isCorrect,
    });
  }
}
