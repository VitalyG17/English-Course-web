import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiLineChart} from '@taiga-ui/addon-charts';
import {TuiAppearance, TuiIcon, TuiPoint, TuiTitle} from '@taiga-ui/core';
import {TuiCardMedium} from '@taiga-ui/layout';
import {TuiBadge} from '@taiga-ui/kit';

@Component({
  selector: 'user-stats',
  standalone: true,
  templateUrl: './user-stats.component.html',
  styleUrl: './user-stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiLineChart, TuiTitle, TuiCardMedium, TuiAppearance, TuiIcon, TuiBadge],
})
export class UserStatsComponent {
  protected readonly firstValue: readonly TuiPoint[] = [
    [0, 10],
    [10, 15],
    [20, 45],
    [30, 50],
    [40, 60],
  ];

  protected readonly secondValue: readonly TuiPoint[] = [
    [40, 60],
    [30, 50],
    [20, 45],
    [10, 15],
  ];
}
