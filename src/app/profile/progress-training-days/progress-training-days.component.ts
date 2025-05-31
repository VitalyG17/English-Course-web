import {ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, Signal} from '@angular/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {NgForOf, NgIf} from '@angular/common';
import {TuiAppearance, TuiCalendar, TuiMarkerHandler, TuiTitle} from '@taiga-ui/core';
import {TuiCardMedium, TuiHeader} from '@taiga-ui/layout';
import {toSignal} from '@angular/core/rxjs-interop';
import {ProfileService} from '../shared/services/profile.service';
import {TuiDay} from '@taiga-ui/cdk';
import {DayActivity, TrainingProgress} from '../shared/interfaces/trainingProgress.interface';

interface WeekDays {
  short: string;
  active: boolean;
}

const CHECK_DAY: [string] = ['var(--tui-status-positive)'];
const DAYS_OF_WEEK: readonly string[] = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

@Component({
  selector: 'progress-training-days',
  standalone: true,
  templateUrl: './progress-training-days.component.html',
  styleUrl: './progress-training-days.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiAvatar, NgIf, NgForOf, TuiCardMedium, TuiAppearance, TuiHeader, TuiTitle, TuiCalendar],
})
export class ProgressTrainingDaysComponent {
  private readonly profileService: ProfileService = inject(ProfileService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  protected readonly MAX_DATE: TuiDay = new TuiDay(2101, 0, 1);
  protected readonly MIN_DATE: TuiDay = new TuiDay(2025, 0, 1);

  protected readonly progress: Signal<TrainingProgress> = toSignal(this.profileService.getTrainingProgress(), {
    initialValue: {streak: 0, days: []},
  });

  private readonly activeDays: Signal<TuiDay[]> = computed(() => {
    return this.progress()
      .days.filter((day: DayActivity) => day.active)
      .map((day: DayActivity) => TuiDay.fromLocalNativeDate(new Date(day.date)));
  });

  constructor() {
    effect(() => {
      this.progress();
      this.cdr.markForCheck();
    });
  }

  protected readonly markerHandler: TuiMarkerHandler = (day: TuiDay) => {
    return this.activeDays().some((active: TuiDay) => active.daySame(day)) ? CHECK_DAY : [];
  };

  protected readonly weekDays: Signal<WeekDays[]> = computed(() => {
    const startOfWeek: TuiDay = TuiDay.currentLocal().append({
      day: new Date().getDay() === 0 ? -6 : -(new Date().getDay() - 1),
    });

    return Array.from({length: 7}, (_, i) => {
      return {
        short: DAYS_OF_WEEK[i],
        active: this.activeDays().some((day: TuiDay) => day.daySame(startOfWeek.append({day: i}))),
      };
    });
  });
}
