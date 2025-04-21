import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiArcChart} from '@taiga-ui/addon-charts';
import {TuiAppearance, TuiTitle} from '@taiga-ui/core';
import {TuiCardMedium, TuiHeader} from '@taiga-ui/layout';

@Component({
  selector: 'language-progress',
  standalone: true,
  templateUrl: './language-progress.component.html',
  styleUrl: './language-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiArcChart, TuiAppearance, TuiCardMedium, TuiTitle, TuiHeader],
})
export class LanguageProgressComponent {}
