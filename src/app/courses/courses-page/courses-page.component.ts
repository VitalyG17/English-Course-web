import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {TuiFallbackSrcPipe, TuiSurface, TuiTitle} from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
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
  imports: [TuiAvatar, TuiCardLarge, TuiHeader, TuiSurface, TuiTitle, NgForOf, AsyncPipe, TuiFallbackSrcPipe],
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
}
