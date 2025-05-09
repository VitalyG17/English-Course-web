import {Difficulty} from '../enum/Difficulty';

export class Courses {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: Difficulty;
  createdAt: string;
  updatedAt: string;
  isStarted: boolean;
  isCompleted: boolean;

  constructor(
    id: number = 0,
    title: string = '',
    description: string = '',
    imageUrl: string = '',
    difficulty: Difficulty = Difficulty.BEGINNER,
    createdAt: string = '',
    updatedAt: string = '',
    isStarted: boolean = false,
    isCompleted: boolean = false,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.difficulty = difficulty;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isStarted = isStarted;
    this.isCompleted = isCompleted;
  }
}
