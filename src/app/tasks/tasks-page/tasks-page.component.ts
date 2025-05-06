import {ChangeDetectionStrategy, Component, computed, inject, Signal, signal, WritableSignal} from '@angular/core';
import {TASK_TYPE_TITLES, TaskType} from '../shared/enum/TaskType';
import {NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {MatchPairsComponent} from '../match-pairs/match-pairs.component';
import {FillBlankComponent} from '../fill-blank/fill-blank.component';
import {MultipleChoiceComponent} from '../multiple-choice/multiple-choice.component';
import {TuiAppearance, TuiButton, TuiLoader} from '@taiga-ui/core';
import {TuiCardLarge} from '@taiga-ui/layout';
import {TuiProgressBar, TuiProgressSegmented} from '@taiga-ui/kit';
import {AudioTranslationComponent} from '../audio-translation/audio-translation.component';
import {ListeningComponent} from '../listening/listening.component';
import {TaskService} from '../shared/services/task.service';
import {distinctUntilChanged, filter, map, switchMap} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Task} from '../shared/interfaces/Task';
import {TaskResult} from '../shared/interfaces/TaskResult';
import {TaskProgress} from '../shared/interfaces/Progress';

@Component({
  selector: 'tasks-page',
  standalone: true,
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgSwitch,
    NgSwitchCase,
    MatchPairsComponent,
    FillBlankComponent,
    MultipleChoiceComponent,
    TuiAppearance,
    TuiCardLarge,
    TuiProgressBar,
    TuiProgressSegmented,
    AudioTranslationComponent,
    ListeningComponent,
    NgIf,
    TuiButton,
    TuiLoader,
  ],
})
export class TasksPageComponent {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly taskService: TaskService = inject(TaskService);

  protected taskTypeEnum: typeof TaskType = TaskType;

  protected readonly tasks: WritableSignal<Task[]> = signal<Task[]>([]);
  protected readonly currentTaskIndex: WritableSignal<number> = signal(0);
  protected readonly hasAnswered: WritableSignal<boolean> = signal(false);
  protected readonly results: WritableSignal<TaskResult[]> = signal<TaskResult[]>([]);
  protected readonly isLoading: WritableSignal<boolean> = signal(true);

  protected readonly currentTask: Signal<Task> = computed(() => this.tasks()[this.currentTaskIndex()] ?? null);

  protected readonly taskTitle: Signal<string> = computed(() =>
    this.currentTask() ? TASK_TYPE_TITLES[this.currentTask().type] : 'Загрузка...',
  );

  protected readonly progress: Signal<TaskProgress> = computed(() => ({
    max: this.tasks().length,
    value: this.currentTaskIndex() + 1,
  }));

  constructor() {
    this.initTest();
  }

  private initTest(): void {
    this.isLoading.set(true);
    this.route.paramMap
      .pipe(
        map((params: ParamMap) => Number(params.get('testId'))),
        filter((id: number) => !isNaN(id)),
        distinctUntilChanged(),
        switchMap((testId: number) => this.taskService.getByTestId(testId)),
      )
      .subscribe((tasks: Task[]) => {
        this.tasks.set(tasks);
        this.isLoading.set(false);
      });
  }

  protected handleAnswer(answer: {isCorrect: boolean}): void {
    this.hasAnswered.set(true);
    this.results.update((results: TaskResult[]) => [
      ...results,
      {taskId: this.currentTask().id, isCorrect: answer.isCorrect},
    ]);
  }

  protected nextTask(): void {
    if (!this.hasAnswered()) return;
    if (this.currentTaskIndex() + 1 < this.tasks().length) {
      this.currentTaskIndex.set(this.currentTaskIndex() + 1);
      this.hasAnswered.set(false);
    }
  }

  protected completeTest(): void {
    console.log('Результаты теста:', this.results());
  }
}
