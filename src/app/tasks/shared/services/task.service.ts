import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {SnackBarService} from '../../../../shared/services/snack-bar.service';
import {catchError, Observable, of} from 'rxjs';
import {Task} from '../interfaces/Task';

@Injectable()
export class TaskService {
  private readonly baseApiUrl: string = 'http://localhost:3000/task';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService,
  ) {}

  public getByTestId(testId: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.baseApiUrl}/by-test/${testId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(err);
        this.snackBarService.errorShow('Ошибка получения заданий');
        return of([]);
      }),
    );
  }
}
