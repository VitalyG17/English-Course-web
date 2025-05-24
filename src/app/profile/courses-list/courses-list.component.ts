import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiAppearance, TuiButton, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiCardMedium, TuiHeader} from '@taiga-ui/layout';
import {inject, Signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';
import {RouterLink} from '@angular/router';
import {CoursesService} from '../../courses/courses-page/shared/services/courses.service';
import {Courses} from '../../courses/courses-page/shared/models/courses.model';
import {NgForOf, NgIf} from '@angular/common';
import {TuiAvatar} from '@taiga-ui/kit';

@Component({
  selector: 'courses-list',
  standalone: true,
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
  imports: [
    TuiAppearance,
    TuiCardLarge,
    TuiCardMedium,
    TuiHeader,
    TuiTitle,
    NgIf,
    NgForOf,
    TuiAvatar,
    TuiButton,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent {
  private readonly coursesService: CoursesService = inject(CoursesService);

  protected readonly completedCourses: Signal<Courses[]> = toSignal(
    this.coursesService.getAllWithProgress().pipe(
      map((courses: Courses[]) =>
        courses
          .filter((course: Courses) => course.isCompleted)
          .map((course: Courses) => ({
            ...course,
            imageUrl: `http://localhost:3000/uploads/courses/${course.imageUrl}`,
          })),
      ),
    ),
    {initialValue: []},
  );
}
