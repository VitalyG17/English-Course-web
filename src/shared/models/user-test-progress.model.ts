export class UserTestProgress {
  id: number;
  userId: number;
  testId: number;
  completed: boolean;
  score: number;
  completedAt: string;

  constructor(
    id: number = 0,
    userId: number = 0,
    testId: number = 0,
    completed: boolean = false,
    score: number = 0,
    completedAt: string = '',
  ) {
    this.id = id;
    this.userId = userId;
    this.testId = testId;
    this.completed = completed;
    this.score = score;
    this.completedAt = completedAt;
  }
}
