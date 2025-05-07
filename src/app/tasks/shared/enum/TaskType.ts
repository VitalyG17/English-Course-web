export enum TaskType {
  FILL_IN_THE_BLANK = 'FILL_IN_THE_BLANK',
  MATCHING = 'MATCHING',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  AUDIO_TRANSLATION = 'AUDIO_TRANSLATION',
  LISTING = 'LISTING',
}

export const TASK_TYPE_TITLES: {[key in TaskType]: string} = {
  [TaskType.FILL_IN_THE_BLANK]: 'Заполни пропуск',
  [TaskType.MATCHING]: 'Составь пары',
  [TaskType.MULTIPLE_CHOICE]: 'Выбери правильный(е) вариант(ы)',
  [TaskType.AUDIO_TRANSLATION]: 'Напиши перевод аудиозаписи',
  [TaskType.LISTING]: 'Устно переведи предложение',
};
