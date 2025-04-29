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

  constructor(
    id: number = 0,
    title: string = '',
    imageUrl: string = '',
    createdAt: string = '',
    updatedAt: string = '',
    progress: UserTestProgress,
    isStarted: boolean = false,
    isCompleted: boolean = false,
  ) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.progress = progress;
    this.isStarted = isStarted;
    this.isCompleted = isCompleted;
  }
}
