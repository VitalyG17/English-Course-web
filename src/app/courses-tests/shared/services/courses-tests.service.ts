import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {SnackBarService} from '../../../../shared/services/snack-bar.service';
import {catchError, Observable, of} from 'rxjs';
import {CoursesTests} from '../models/courses-tests.model';

@Injectable()
export class CoursesTestsService {
  private readonly baseApiUrl: string = 'http://localhost:3000/course-tests';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService,
  ) {}

  public getByCourseId(courseId: number): Observable<CoursesTests[]> {
    return this.httpClient.get<CoursesTests[]>(`${this.baseApiUrl}/by-course/${courseId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(err);
        this.snackBarService.errorShow('Ошибка получения тестов');
        return of([]);
      }),
    );
  }
}
