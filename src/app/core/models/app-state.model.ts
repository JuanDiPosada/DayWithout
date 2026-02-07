import { Habit } from './habit.model';
import { GameStats } from './game.model';

export interface AppState {
  habits: Habit[];
  gameStats: GameStats;
  settings: {
    darkMode: boolean;
    notificationsEnabled: boolean;
  };
}
