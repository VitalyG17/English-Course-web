import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {TuiInputInline} from '@taiga-ui/kit';
import {FormsModule} from '@angular/forms';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {TuiCardLarge} from '@taiga-ui/layout';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'fill-blank',
  standalone: true,
  templateUrl: './fill-blank.component.html',
  styleUrl: './fill-blank.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiInputInline, FormsModule, TuiAppearance, TuiCardLarge, NgForOf, TuiButton, NgIf],
})
export class FillBlankComponent implements OnInit {
  // TODO вернуться к типизации
  @Input() task: any;

  @Output() answer = new EventEmitter<{selected: string; isCorrect: boolean}>();

  protected selectedOption: WritableSignal<string | null> = signal<string | null>(null);
  protected hasSelectedOption: Signal<boolean> = computed(() => !!this.selectedOption());
  protected availableOptions: string[] = [];

  ngOnInit() {
    if (this.task?.options) {
      this.availableOptions = this.task.options;
    }
  }

  protected selectOption(option: string): void {
    this.selectedOption.set(option);
  }

  protected removeOption(): void {
    this.selectedOption.set(null);
  }

  // TODO вернуться к реализации проверки
  protected checkAnswer(): void {
    const isCorrect: boolean = this.selectedOption() === this.task.correctAnswer;
    this.answer.emit({
      selected: this.selectedOption() || '',
      isCorrect,
    });
  }
}
