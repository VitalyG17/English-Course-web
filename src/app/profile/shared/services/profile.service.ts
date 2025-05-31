import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, EMPTY, Observable} from 'rxjs';
import {Profile} from '../models/profile.model';
import {SnackBarService} from '../../../../shared/services/snack-bar.service';
import {UploadResponse} from '../interfaces/uploadResponce.interface';
import {TrainingProgress} from '../interfaces/trainingProgress.interface';

@Injectable()
export class ProfileService {
  private readonly baseApiUrl: string = 'http://localhost:3000/profile';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService,
  ) {}

  public getProfile(): Observable<Profile> {
    return this.httpClient.get<Profile>(`${this.baseApiUrl}/getProfile`).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(err);
        this.snackBarService.errorShow('Ошибка получения профиля');
        return EMPTY;
      }),
    );
  }

  public getTrainingProgress(): Observable<TrainingProgress> {
    return this.httpClient.get<TrainingProgress>(`${this.baseApiUrl}/training-stats`).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(err);
        this.snackBarService.errorShow('Ошибка получения дней обучения');
        return EMPTY;
      }),
    );
  }

  public uploadAvatar(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<UploadResponse>(`${this.baseApiUrl}/upload-avatar`, formData).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(err);
        err.status === 413
          ? this.snackBarService.errorShow('Файл слишком большой')
          : this.snackBarService.errorShow('Ошибка загрузки аватарки');
        return EMPTY;
      }),
    );
  }
}
