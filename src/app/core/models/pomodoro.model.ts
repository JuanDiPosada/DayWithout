export interface PomodoroSession {
  id: string;
  startTime: Date;
  durationMinutes: number;
  type: 'work' | 'short-break' | 'long-break';
  completed: boolean;
}
