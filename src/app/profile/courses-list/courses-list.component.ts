import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiAppearance, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiCardMedium, TuiHeader} from '@taiga-ui/layout';
import {TuiRepeatTimes} from '@taiga-ui/cdk';

@Component({
  selector: 'courses-list',
  standalone: true,
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
  imports: [TuiAppearance, TuiCardLarge, TuiCardMedium, TuiHeader, TuiRepeatTimes, TuiTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent {}
