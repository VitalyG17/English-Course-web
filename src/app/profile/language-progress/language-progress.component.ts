import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {TuiArcChart} from '@taiga-ui/addon-charts';
import {TuiAppearance, TuiTitle} from '@taiga-ui/core';
import {TuiCardMedium, TuiHeader} from '@taiga-ui/layout';
import {RouterLink} from '@angular/router';
import {AchievementsService} from '../../achievements/shared/services/achievements.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {AchievementsProgress} from '../../achievements/shared/interfaces/achievement.interface';

@Component({
  selector: 'language-progress',
  standalone: true,
  templateUrl: './language-progress.component.html',
  styleUrl: './language-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiArcChart, TuiAppearance, TuiCardMedium, TuiTitle, TuiHeader, RouterLink],
})
export class LanguageProgressComponent {
  private readonly achievementsService: AchievementsService = inject(AchievementsService);

  protected readonly achievementsProgress: Signal<AchievementsProgress> = toSignal(
    this.achievementsService.getAchievementsProgress(),
    {initialValue: {achieved: 0, total: 0}},
  );
}
