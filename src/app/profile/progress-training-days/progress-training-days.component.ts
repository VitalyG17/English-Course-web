import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {NgForOf, NgIf} from '@angular/common';
import {TuiAppearance, TuiTitle} from '@taiga-ui/core';
import {TuiCardMedium, TuiHeader} from '@taiga-ui/layout';

@Component({
  selector: 'progress-training-days',
  standalone: true,
  templateUrl: './progress-training-days.component.html',
  styleUrl: './progress-training-days.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiAvatar, NgIf, NgForOf, TuiCardMedium, TuiAppearance, TuiHeader, TuiTitle],
})
export class ProgressTrainingDaysComponent {
  days = [
    {short: 'пн', active: true},
    {short: 'вт', active: true},
    {short: 'ср', active: true},
    {short: 'чт', active: false},
    {short: 'пт', active: false},
    {short: 'сб', active: false},
    {short: 'вс', active: false},
  ];
}
