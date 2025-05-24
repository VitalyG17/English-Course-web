import {UserTestProgress} from '../../../../shared/models/user-test-progress.model';

export class CoursesTests {
  id: number;
  title: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  progress: UserTestProgress;
  isStarted: boolean;
  isCompleted: boolean;
  score?: number;
  completedAt?: string;

  constructor(
    id: number = 0,
    title: string = '',
    imageUrl: string = '',
    createdAt: string = '',
    updatedAt: string = '',
    progress: UserTestProgress,
    isStarted: boolean = false,
    isCompleted: boolean = false,
    score: number = 0,
    completedAt: string = '',
  ) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.progress = progress;
    this.isStarted = isStarted;
    this.isCompleted = isCompleted;
    this.score = score;
    this.completedAt = completedAt;
  }
}
