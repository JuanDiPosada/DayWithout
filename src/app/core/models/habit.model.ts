export interface Habit {
  id: string;
  name: string;
  startDate: string; // ISO string for easy serialization
  lastNotificationDate?: string; // ISO string
}
