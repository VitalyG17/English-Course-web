import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {TuiAppearance, TuiFallbackSrcPipe, TuiSurface, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {TuiAvatar, TuiProgressBar} from '@taiga-ui/kit';
import {AchievementsService} from './shared/services/achievements.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {catchError, forkJoin, map, Observable, of} from 'rxjs';
import {Achievement, DisplayAchievement, UserAchievement} from './shared/interfaces/achievement.interface';

@Component({
  selector: 'achievements',
  standalone: true,
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TuiAppearance,
    TuiCardLarge,
    AsyncPipe,
    TuiFallbackSrcPipe,
    TuiAvatar,
    NgForOf,
    TuiHeader,
    TuiTitle,
    TuiSurface,
    TuiProgressBar,
    NgIf,
  ],
})
export class AchievementsComponent {
  private readonly achievementsService: AchievementsService = inject(AchievementsService);

  private readonly displayingDataAchievements$: Observable<DisplayAchievement[]> = forkJoin({
    allAchievements: this.achievementsService.getAllAchievements(),
    myAchievements: this.achievementsService.getMyAchievements(),
  }).pipe(
    map(({allAchievements, myAchievements}): DisplayAchievement[] => {
      const myAchievedIds = new Set(
        myAchievements.map((userAchievement: UserAchievement) => userAchievement.achievementId),
      );

      return allAchievements
        .map((achievement: Achievement): DisplayAchievement => {
          return {
            ...achievement,
            iconUrl: `http://localhost:3000/uploads/achievements/${achievement.iconUrl}`,
            isAchieved: myAchievedIds.has(achievement.id),
          };
        })
        .sort((a: DisplayAchievement, b: DisplayAchievement) => {
          return (b.isAchieved ? 1 : 0) - (a.isAchieved ? 1 : 0);
        });
    }),
    catchError((error) => {
      console.error(error);
      return of([]);
    }),
  );

  protected readonly achievementsInfo: Signal<DisplayAchievement[]> = toSignal(this.displayingDataAchievements$, {
    initialValue: [],
  });
}
