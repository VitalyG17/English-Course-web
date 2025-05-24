import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiAppearance, TuiButton, TuiLoader, TuiSurface, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
import {ActivatedRoute, Router} from '@angular/router';
import {ReformDatePipe} from '../../../shared/pipes/reform-date.pipe';
import {PercentageCorrectPipe} from '../../../shared/pipes/percentage-correct.pipe';
import {CoursesTests} from '../../courses-tests/shared/models/courses-tests.model';
import {CoursesTestsService} from '../../courses-tests/shared/services/courses-tests.service';
import {SnackBarService} from '../../../shared/services/snack-bar.service';
import {catchError, finalize, of, tap} from 'rxjs';

interface State {
  navigationId: number;
  totalTasks: number;
  errors: number;
  timeSpent: number;
}

@Component({
  selector: 'result-page',
  standalone: true,
  templateUrl: './result-page.component.html',
  styleUrl: './result-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    TuiAppearance,
    TuiCardLarge,
    TuiLoader,
    TuiButton,
    TuiHeader,
    TuiSurface,
    TuiTitle,
    ReformDatePipe,
    PercentageCorrectPipe,
  ],
})
export class ResultPageComponent {
  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly coursesTestsService: CoursesTestsService = inject(CoursesTestsService);
  private readonly snackBarService: SnackBarService = inject(SnackBarService);

  protected readonly isLoading: WritableSignal<boolean> = signal(false);
  protected readonly state: Signal<State> = signal(this.router.getCurrentNavigation()?.extras.state || history.state);
  protected readonly tests: WritableSignal<CoursesTests[]> = signal([]);

  private readonly courseId: WritableSignal<number> = signal(0);
  private readonly testId: WritableSignal<number> = signal(0);

  constructor() {
    effect(() => {
      this.courseId.set(Number(this.route.snapshot.paramMap.get('courseId')));
      this.testId.set(Number(this.route.snapshot.paramMap.get('testId')));
      this.coursesTestsService.getByCourseId(this.courseId()).subscribe((tests: CoursesTests[]) => {
        this.tests.set([...tests].sort((a: CoursesTests, b: CoursesTests) => a.id - b.id));
      });
    });
  }

  protected readonly nextTest = computed(() => {
    return this.tests().find((t: CoursesTests) => t.id > this.testId());
  });

  protected onContinue(): void {
    this.isLoading.set(true);
    this.coursesTestsService
      .completeTest(this.testId(), this.state())
      .pipe(
        tap(() => {
          if (this.nextTest()) {
            this.router.navigate([`/courses/${this.courseId()}/tests/${this.nextTest()?.id}/tasks`]);
          } else {
            this.router.navigate([`/courses/${this.courseId()}/tests`]);
            this.snackBarService.successShow('Все тесты курса завершены!');
          }
        }),
        catchError(() => {
          this.snackBarService.errorShow('Не удалось завершить тест. Попробуйте снова.');
          return of(null);
        }),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe();
  }
}
