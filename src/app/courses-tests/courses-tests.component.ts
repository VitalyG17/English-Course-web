import {ChangeDetectionStrategy, Component, computed, inject, Signal} from '@angular/core';
import {CoursesTestsService} from './shared/services/courses-tests.service';
import {TuiAvatar, TuiBadge, TuiProgressBar, TuiProgressLabel, TuiStatus} from '@taiga-ui/kit';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
import {TuiAppearance, TuiFallbackSrcPipe, TuiSurface, TuiTitle} from '@taiga-ui/core';
import {CoursesService} from '../courses/courses-page/shared/services/courses.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Courses} from '../courses/courses-page/shared/models/courses.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {distinctUntilChanged, filter, map, Observable, switchMap} from 'rxjs';
import {CoursesTests} from './shared/models/courses-tests.model';

@Component({
  selector: 'courses-tests',
  standalone: true,
  templateUrl: './courses-tests.component.html',
  styleUrl: './courses-tests.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgForOf,
    TuiCardLarge,
    TuiTitle,
    TuiAvatar,
    TuiAppearance,
    TuiFallbackSrcPipe,
    AsyncPipe,
    TuiHeader,
    TuiSurface,
    TuiProgressBar,
    TuiProgressLabel,
    TuiBadge,
    TuiStatus,
    NgIf,
  ],
})
export class CoursesTestsComponent {
  private readonly coursesTestsService: CoursesTestsService = inject(CoursesTestsService);
  private readonly coursesService: CoursesService = inject(CoursesService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private readonly courseId$: Observable<number> = this.route.paramMap.pipe(
    map((params: ParamMap) => Number(params.get('courseId'))),
    filter((id: number) => !isNaN(id)),
    distinctUntilChanged(),
  );

  // Выбранный курс
  readonly currentCourse: Signal<Courses | null> = toSignal(
    this.courseId$.pipe(switchMap((id: number): Observable<Courses> => this.coursesService.getById(id))),
    {
      initialValue: null,
    },
  );

  // Тесты внутри курса
  readonly coursesTestInfo: Signal<CoursesTests[]> = toSignal(
    this.courseId$.pipe(
      switchMap((id: number): Observable<CoursesTests[]> => this.coursesTestsService.getByCourseId(id)),
      map((tests: CoursesTests[]) =>
        tests
          .map((test: CoursesTests) => ({
            ...test,
            imageUrl: `http://localhost:3000/uploads/courses-tests/${test.imageUrl}`,
          }))
          .sort((a: CoursesTests, b: CoursesTests) => a.id - b.id),
      ),
    ),
    {initialValue: []},
  );

  protected readonly completedTestsCount: Signal<number> = computed(
    () => this.coursesTestInfo().filter((test: CoursesTests) => test.isCompleted).length,
  );
}
