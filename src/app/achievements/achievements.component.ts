import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'achievements',
  standalone: true,
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementsComponent {}
