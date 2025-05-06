import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';
import {NgForOf} from '@angular/common';
import {TuiActionBarComponent, TuiActionBarDirective} from '@taiga-ui/kit';
import {Task} from '../shared/interfaces/Task';
import {Subject, takeUntil, timer} from 'rxjs';

enum Side {
  Left = 'left',
  Right = 'right',
}

@Component({
  selector: 'match-pairs',
  standalone: true,
  templateUrl: './match-pairs.component.html',
  styleUrl: './match-pairs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiButton, NgForOf, TuiActionBarComponent, TuiActionBarDirective],
})
export class MatchPairsComponent implements OnInit, OnDestroy {
  @Output()
  public answer = new EventEmitter<{answer: [string, string][]; isCorrect: boolean}>();

  @Input()
  public task: Task | null = null;

  protected readonly Side: typeof Side = Side;

  private selectedLeft: WritableSignal<string | null> = signal<string | null>(null);
  private selectedRight: WritableSignal<string | null> = signal<string | null>(null);
  private matchedPairs: WritableSignal<[string, string][]> = signal<[string, string][]>([]);

  private parsedPairs: Signal<any[]> = signal<string[]>([]);
  protected leftWords: Signal<string[]> = signal<string[]>([]);
  protected rightWords: Signal<string[]> = signal<string[]>([]);

  protected disabledLeft: WritableSignal<Set<string>> = signal<Set<string>>(new Set());
  protected disabledRight: WritableSignal<Set<string>> = signal<Set<string>>(new Set());

  protected hintWord: WritableSignal<string | null> = signal<string | null>(null);
  protected open: WritableSignal<boolean> = signal(false);

  private failedAttempts: WritableSignal<Map<string, number>> = signal(new Map());
  private highlightNegative = signal<{left: string; right: string} | null>(null);

  private destroy$: Subject<void> = new Subject<void>();

  public ngOnInit() {
    this.parsedPairs = computed(() => {
      return (
        this.task?.options?.map((opt: string) => {
          const [left, right] = opt.split(':');
          return {left, right};
        }) ?? []
      );
    });
    this.leftWords = computed(() => this.parsedPairs().map((p) => p.left));
    this.rightWords = signal(this.shuffle(this.parsedPairs().map((p) => p.right)));
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected selectLeft(word: string) {
    this.handleSelect(word, Side.Left, this.selectedLeft, this.selectedRight, this.disabledLeft);
  }

  protected selectRight(word: string) {
    this.handleSelect(word, Side.Right, this.selectedRight, this.selectedLeft, this.disabledRight);
  }

  private processPair(left: string, right: string) {
    const pair: [string, string] = [left, right];

    const isCorrect: boolean = this.normalizeCorrectAnswer().some((correct) => {
      const [cLeft, cRight] = correct.split(':');
      return cLeft === pair[0] && cRight === pair[1];
    });

    if (isCorrect) {
      this.matchedPairs.set([...this.matchedPairs(), pair]);
      this.disabledLeft.set(new Set([...this.disabledLeft(), pair[0]]));
      this.disabledRight.set(new Set([...this.disabledRight(), pair[1]]));
      this.highlightNegative.set(null);

      if (this.hintWord() === pair[0]) {
        this.open.set(false);
        this.hintWord.set(null);
      }

      if (this.matchedPairs().length === this.task?.correctAnswer.length) {
        this.answer.emit({
          answer: this.matchedPairs(),
          isCorrect: this.isFullyCorrect(),
        });
      }
    } else {
      this.highlightNegative.set({left, right});

      const mapCopy = new Map(this.failedAttempts());
      const fails = mapCopy.get(left) || 0;
      mapCopy.set(left, fails + 1);
      this.failedAttempts.set(mapCopy);

      if (fails + 1 >= 3) {
        this.hintWord.set(left);
        this.open.set(true);
      }

      timer(1000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          const current = this.highlightNegative();
          if (current?.left === left && current?.right === right) {
            this.highlightNegative.set(null);
          }
        });
    }

    this.selectedLeft.set(null);
    this.selectedRight.set(null);
  }

  private isFullyCorrect(): boolean {
    return this.normalizeCorrectAnswer().every((correct) =>
      this.matchedPairs().some(([l, r]) => `${l}:${r}` === correct),
    );
  }

  private handleSelect(
    word: string,
    side: Side,
    selectedThis: WritableSignal<string | null>,
    selectedOther: WritableSignal<string | null>,
    disabled: WritableSignal<Set<string>>,
  ) {
    if (disabled().has(word)) return;

    const other = selectedOther();
    if (other !== null) {
      const left = side === Side.Left ? word : other;
      const right = side === Side.Right ? word : other;
      this.processPair(left, right);
    } else {
      selectedThis.set(word);
      selectedOther.set(null);
      this.highlightNegative.set(null);
    }
  }

  protected getAppearance(word: string, side: Side): string {
    const selected = side === Side.Left ? this.selectedLeft() : this.selectedRight();
    const disabled = side === Side.Left ? this.disabledLeft() : this.disabledRight();
    const highlight = this.highlightNegative();

    if (disabled.has(word)) return 'positive';
    if (highlight?.[side] === word) return 'negative';
    if (selected === word) return 'primary';

    return 'neutral';
  }

  protected getHint(left: string): string {
    return (
      this.normalizeCorrectAnswer()
        .find((p: string) => p.startsWith(`${left}:`))
        ?.split(':')[1] ?? 'Подсказка не найдена'
    );
  }

  protected closeHint() {
    this.open.set(false);
    this.hintWord.set(null);
  }

  private shuffle<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  private normalizeCorrectAnswer(): string[] {
    if (!this.task || !this.task.correctAnswer) return [];
    return Array.isArray(this.task.correctAnswer) ? this.task.correctAnswer : [this.task.correctAnswer];
  }
}
