import { Injectable } from '@angular/core';
import { Habit } from '../../../core/models/habit.model';

@Injectable({
  providedIn: 'root',
})
export class HabitsService {
  private readonly STORAGE_KEY = 'dayWithout_habits';
  private habits: Habit[] = [];

  constructor() {
    this.loadHabits();
  }

  // Load habits from localStorage
  private loadHabits(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.habits = JSON.parse(stored);
    }
  }

  // Save habits to localStorage
  private saveHabits(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.habits));
  }

  // Get all habits
  getHabits(): Habit[] {
    return this.habits;
  }

  // Create a new habit
  createHabit(name: string): Habit {
    const newHabit: Habit = {
      id: this.generateId(),
      name,
      startDate: new Date().toISOString(),
    };
    this.habits.push(newHabit);
    this.saveHabits();
    return newHabit;
  }

  // Delete a habit
  deleteHabit(id: string): void {
    this.habits = this.habits.filter((h) => h.id !== id);
    this.saveHabits();
  }

  // Reset habit (relapse)
  resetHabit(id: string): void {
    const habit = this.habits.find((h) => h.id === id);
    if (habit) {
      habit.startDate = new Date().toISOString();
      habit.lastNotificationDate = undefined;
      this.saveHabits();
    }
  }

  // Update last notification date
  updateNotificationDate(id: string): void {
    const habit = this.habits.find((h) => h.id === id);
    if (habit) {
      habit.lastNotificationDate = new Date().toISOString();
      this.saveHabits();
    }
  }

  // Calculate elapsed time
  getElapsedTime(habit: Habit): {
    days: number;
    hours: number;
    minutes: number;
    totalDays: number;
  } {
    const start = new Date(habit.startDate);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes, totalDays: days };
  }

  // Check if notification should be shown
  shouldShowNotification(habit: Habit): boolean {
    const elapsed = this.getElapsedTime(habit);

    // Must be at least 5 days
    if (elapsed.totalDays < 5) return false;

    // Check if we already notified today
    if (habit.lastNotificationDate) {
      const lastNotif = new Date(habit.lastNotificationDate);
      const today = new Date();

      // If last notification was today, don't show again
      if (
        lastNotif.getDate() === today.getDate() &&
        lastNotif.getMonth() === today.getMonth() &&
        lastNotif.getFullYear() === today.getFullYear()
      ) {
        return false;
      }
    }

    return true;
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
