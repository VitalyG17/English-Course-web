import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import {TuiAvatar, TuiCalendarRange, TuiChip, TuiDayRangePeriod} from '@taiga-ui/kit';
import {NgForOf, NgIf} from '@angular/common';
import {TuiAppearance, TuiMarkerHandler, TuiTitle} from '@taiga-ui/core';
import {TuiCardMedium, TuiHeader} from '@taiga-ui/layout';
import {toSignal} from '@angular/core/rxjs-interop';
import {ProfileService} from '../shared/services/profile.service';
import {TuiDay, TuiDayRange} from '@taiga-ui/cdk';
import {DayActivity, TrainingProgress} from '../shared/interfaces/trainingProgress.interface';

interface WeekDays {
  short: string;
  active: boolean;
}

const today = TuiDay.currentLocal();
const startOfWeek = today.append({day: -today.dayOfWeek()});
const startOfMonth = today.append({day: 1 - today.day});
const startOfYear = new TuiDay(today.year, 0, 1);

const CHECK_DAY: [string] = ['var(--tui-status-positive)'];
const DAYS_OF_WEEK: readonly string[] = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

@Component({
  selector: 'progress-training-days',
  standalone: true,
  templateUrl: './progress-training-days.component.html',
  styleUrl: './progress-training-days.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiAvatar, NgIf, NgForOf, TuiCardMedium, TuiAppearance, TuiHeader, TuiTitle, TuiCalendarRange, TuiChip],
})
export class ProgressTrainingDaysComponent {
  private readonly profileService: ProfileService = inject(ProfileService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  protected readonly MAX_DATE: TuiDay = new TuiDay(2101, 0, 1);
  protected readonly MIN_DATE: TuiDay = new TuiDay(2025, 0, 1);

  protected readonly calendarRangeFilter = [
    new TuiDayRangePeriod(new TuiDayRange(startOfWeek, today), 'Неделя'),
    new TuiDayRangePeriod(new TuiDayRange(startOfMonth, today), 'Месяц'),
    new TuiDayRangePeriod(new TuiDayRange(startOfYear, today), 'Год'),
  ];

  protected readonly progress: Signal<TrainingProgress> = toSignal(this.profileService.getTrainingProgress(), {
    initialValue: {streak: 0, days: []},
  });

  private readonly activeDays: Signal<TuiDay[]> = computed(() => {
    return this.progress()
      .days.filter((day: DayActivity) => day.active)
      .map((day: DayActivity) => TuiDay.fromLocalNativeDate(new Date(day.date)));
  });

  protected selectedRange: WritableSignal<TuiDayRange | null> = signal<TuiDayRange | null>(null);

  protected readonly activeDaysCount: Signal<number> = computed(() => {
    return this.selectedRange()?.from && this.selectedRange()?.to
      ? this.activeDays().filter(
          (day: TuiDay) =>
            day.daySameOrAfter(this.selectedRange()!.from) && day.daySameOrBefore(this.selectedRange()!.to),
        ).length
      : 0;
  });

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

  constructor() {
    effect(() => {
      this.progress();
      this.cdr.markForCheck();
    });
  }

  protected onRangeChange(range: TuiDayRange | null): void {
    if (range) {
      this.selectedRange.set(range);
      this.cdr.markForCheck();
    }
  }

  protected readonly markerHandler: TuiMarkerHandler = (day: TuiDay) => {
    return this.activeDays().some((active: TuiDay) => active.daySame(day)) ? CHECK_DAY : [];
  };
}
