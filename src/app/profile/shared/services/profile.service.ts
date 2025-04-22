import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, EMPTY, Observable} from 'rxjs';
import {Profile} from '../models/profile.model';
import {SnackBarService} from '../../../../shared/services/snack-bar.service';

@Injectable()
export class ProfileService {
  private readonly baseApiUrl: string = 'http://localhost:3000/profile';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService,
  ) {}

  public getProfile(): Observable<Profile> {
    return this.httpClient.get<Profile>(`${this.baseApiUrl}/getProfile`).pipe(
      catchError((err: unknown) => {
        console.error(err);
        this.snackBarService.errorShow('Ошибка получения профиля');
        return EMPTY;
      }),
    );
  }
}
