export interface Habit {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  lastCompleted?: Date;
  streak: number;
}
