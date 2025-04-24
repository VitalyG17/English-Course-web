import {ChangeDetectionStrategy, Component, computed, inject, signal, Signal, WritableSignal} from '@angular/core';
import {TuiAppearance, TuiFallbackSrcPipe, TuiSurface, TuiTitle} from '@taiga-ui/core';
import {TuiAvatar, TuiPagination} from '@taiga-ui/kit';
import {TuiCardLarge, TuiCell, TuiHeader} from '@taiga-ui/layout';
import {AsyncPipe, NgForOf} from '@angular/common';
import {CoursesService} from './shared/services/courses.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {Courses} from './shared/models/courses.model';

@Component({
  selector: 'courses-page',
  standalone: true,
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TuiAvatar,
    TuiCardLarge,
    TuiHeader,
    TuiSurface,
    TuiTitle,
    NgForOf,
    AsyncPipe,
    TuiFallbackSrcPipe,
    TuiAppearance,
    TuiCell,
    TuiPagination,
  ],
})
export class CoursesPageComponent {
  private readonly coursesService: CoursesService = inject(CoursesService);

  protected readonly coursesInfo: Signal<Courses[]> = toSignal(
    this.coursesService.getAll().pipe(
      map((courses: Courses[]) =>
        courses.map((course: Courses) => ({
          ...course,
          imageUrl: `http://localhost:3000/uploads/courses/${course.imageUrl}`,
        })),
      ),
    ),
    {initialValue: []},
  );

  protected readonly index: WritableSignal<number> = signal(0);

  protected readonly paginatedCourses: Signal<Courses[]> = computed(() => {
    const start: number = this.index() * this.pageSize;
    const end: number = start + this.pageSize;

    return this.coursesInfo().slice(start, end);
  });

  protected readonly totalPages: Signal<number> = computed(() => Math.ceil(this.coursesInfo().length / this.pageSize));

  protected readonly pageSize: number = 20;

  protected goToPage(index: number): void {
    this.index.set(index);
  }
}
