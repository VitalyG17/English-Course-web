import {AchievementType} from '../enum/AchievementType';

export interface Achievement {
  id: number;
  title: string;
  description: string;
  iconUrl: string;
  type: AchievementType;
  conditionValue: string;
  createdAt: string;
}

export interface UserAchievement {
  id: number;
  userId: number;
  achievementId: number;
  receivedAt: string;
}

export interface DisplayAchievement extends Achievement {
  isAchieved: boolean;
}

export interface AchievementsProgress {
  achieved: number;
  total: number;
}
