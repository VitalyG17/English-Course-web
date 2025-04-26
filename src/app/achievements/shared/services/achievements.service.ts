import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {SnackBarService} from '../../../../shared/services/snack-bar.service';
import {catchError, forkJoin, map, Observable, of} from 'rxjs';
import {Achievement, AchievementsProgress, UserAchievement} from '../interfaces/achievement.interface';

@Injectable()
export class AchievementsService {
  private readonly baseApiUrl: string = 'http://localhost:3000/achievement';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBarService: SnackBarService,
  ) {}

  public getAllAchievements(): Observable<Achievement[]> {
    return this.httpClient.get<Achievement[]>(`${this.baseApiUrl}/getAll`).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(err);
        this.snackBarService.errorShow('Ошибка получения достижений');
        return of([]);
      }),
    );
  }

  public getMyAchievements(): Observable<UserAchievement[]> {
    return this.httpClient.get<UserAchievement[]>(`${this.baseApiUrl}/myAchievements`).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(err);
        this.snackBarService.errorShow('Ошибка получения ваших достижений');
        return of([]);
      }),
    );
  }

  public getAchievementsProgress(): Observable<AchievementsProgress> {
    return forkJoin({
      allAchievements: this.getAllAchievements(),
      myAchievements: this.getMyAchievements(),
    }).pipe(
      map(({allAchievements, myAchievements}) => ({
        achieved: myAchievements.length,
        total: allAchievements.length,
      })),
      catchError((error) => {
        console.error(error);
        this.snackBarService.errorShow('Ошибка получения прогресса достижений');
        return of({achieved: 0, total: 0});
      }),
    );
  }
}
