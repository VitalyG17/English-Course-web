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
import {Task} from '../shared/interfaces/Task';
import {NgForOf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {TuiCardLarge} from '@taiga-ui/layout';

@Component({
  selector: 'multiple-choice',
  standalone: true,
  templateUrl: './multiple-choice.component.html',
  styleUrl: './multiple-choice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, ReactiveFormsModule, TuiAppearance, TuiCardLarge, TuiButton],
})
export class MultipleChoiceComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() answer = new EventEmitter<{selected: string; isCorrect: boolean}>();

  protected selectedOption: WritableSignal<string | null> = signal<string | null>(null);
  protected hasSelectedOption: Signal<boolean> = computed(() => !!this.selectedOption());
  protected availableOptions: string[] = [];

  public ngOnInit(): void {
    if (this.task?.options) {
      this.availableOptions = this.task.options;
    }
  }

  protected selectOption(option: string): void {
    this.selectedOption.set(option);
  }

  protected checkAnswer(): void {
    const isCorrect: boolean = this.selectedOption() === this.task?.correctAnswer.toString();
    this.answer.emit({
      selected: this.selectedOption() || '',
      isCorrect,
    });
  }
}
