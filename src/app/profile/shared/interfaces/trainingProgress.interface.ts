export interface DayActivity {
  date: string;
  active: boolean;
}

export interface TrainingProgress {
  streak: number;
  days: DayActivity[];
}
