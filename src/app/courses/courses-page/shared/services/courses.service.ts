import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {SnackBarService} from '../../../../../shared/services/snack-bar.service';
import {catchError, EMPTY, Observable, of} from 'rxjs';
import {Courses} from '../models/courses.model';

@Injectable()
export class CoursesService {
  private readonly baseApiUrl: string = 'http://localhost:3000/courses';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService,
  ) {}

  public getAllWithProgress(): Observable<Courses[]> {
    return this.httpClient.get<Courses[]>(`${this.baseApiUrl}/allCoursesWithProgress`).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(err);
        this.snackBarService.errorShow('Ошибка получения курсов');
        return of([]);
      }),
    );
  }

  public getById(id: number): Observable<Courses> {
    return this.httpClient.get<Courses>(`${this.baseApiUrl}/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(err);
        this.snackBarService.errorShow('Ошибка получения курса');
        return EMPTY;
      }),
    );
  }
}
