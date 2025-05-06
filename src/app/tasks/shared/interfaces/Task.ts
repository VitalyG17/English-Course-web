import {TaskType} from '../enum/TaskType';

export interface Task {
  id: number;
  testId: number;
  type: TaskType;
  question?: string[];
  options?: string[];
  correctAnswer: string[] | string;
  errorCount: number;
  audioSrc: string;
  recognitionLang: RecognitionLang;
}

export enum RecognitionLang {
  EN = 'en-US',
  RU = 'ru-RU',
}
