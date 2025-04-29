import {ChangeDetectionStrategy, Component, computed, inject, signal, Signal, WritableSignal} from '@angular/core';
import {TuiAppearance, TuiFallbackSrcPipe, TuiIcon, TuiSurface, TuiTitle} from '@taiga-ui/core';
import {TuiAvatar, TuiBadge, TuiBadgedContentDirective, TuiFilter, TuiPagination} from '@taiga-ui/kit';
import {TuiCardLarge, TuiCell, TuiHeader} from '@taiga-ui/layout';
import {AsyncPipe, NgForOf} from '@angular/common';
import {CoursesService} from './shared/services/courses.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {Courses} from './shared/models/courses.model';
import {FormsModule} from '@angular/forms';
import {Difficulty} from './shared/enum/Difficulty';
import {Router} from '@angular/router';

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
    TuiFilter,
    FormsModule,
    TuiBadgedContentDirective,
    TuiIcon,
    TuiBadge,
  ],
})
export class CoursesPageComponent {
  private readonly coursesService: CoursesService = inject(CoursesService);
  private readonly router: Router = inject(Router);

  protected readonly coursesInfo: Signal<Courses[]> = toSignal(
    this.coursesService.getAllWithProgress().pipe(
      map((courses: Courses[]) =>
        courses.map((course: Courses) => ({
          ...course,
          imageUrl: `http://localhost:3000/uploads/courses/${course.imageUrl}`,
        })),
      ),
    ),
    {initialValue: []},
  );

  protected readonly filteredCourses: Signal<Courses[]> = computed(() => {
    if (this.filters().length === 0) return this.coursesInfo();
    return this.coursesInfo().filter((course: Courses) => this.filters().includes(course.difficulty));
  });

  protected readonly items: Difficulty[] = Object.values(Difficulty);
  protected readonly pageSize: number = 20;
  protected readonly index: WritableSignal<number> = signal(0);

  protected readonly paginatedCourses: Signal<Courses[]> = computed(() => {
    const start: number = this.index() * this.pageSize;
    const end: number = start + this.pageSize;

    return this.filteredCourses().slice(start, end);
  });

  protected readonly totalPages: Signal<number> = computed(() =>
    Math.ceil(this.filteredCourses().length / this.pageSize),
  );

  protected readonly filters: WritableSignal<string[]> = signal<string[]>([]);

  protected readonly model: Signal<string[]> = computed(() =>
    this.filters().length === this.items.length ? [] : this.filters(),
  );

  protected goToPage(index: number): void {
    this.index.set(index);
  }

  protected onFilterChange(filters: string[]): void {
    this.filters.set(filters);
    this.index.set(0);
  }

  protected navigateToTests(courseId: number): void {
    this.router.navigate(['/courses', courseId, 'tests']);
  }
}
