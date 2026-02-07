import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitsService } from '../../services/habits.service';
import { Habit } from '../../../../core/models/habit.model';
import { HabitCard } from '../../components/habit-card/habit-card';
import { HabitForm } from '../../components/habit-form/habit-form';

@Component({
  selector: 'app-habits-page',
  standalone: true,
  imports: [CommonModule, HabitCard, HabitForm],
  templateUrl: './habits-page.html',
  styleUrl: './habits-page.css',
})
export class HabitsPage implements OnInit, OnDestroy {
  habits: Habit[] = [];
  elapsedTimes: Map<string, { days: number; hours: number; minutes: number }> =
    new Map();
  private updateInterval: any;

  constructor(private habitsService: HabitsService) {}

  ngOnInit(): void {
    this.loadHabits();
    this.updateElapsedTimes();
    this.checkNotifications();

    // Request notification permission if needed
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Update times every minute
    this.updateInterval = setInterval(() => {
      this.updateElapsedTimes();
      this.checkNotifications();
    }, 60000); // 60 seconds
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  loadHabits(): void {
    this.habits = this.habitsService.getHabits();
  }

  updateElapsedTimes(): void {
    this.habits.forEach((habit) => {
      const elapsed = this.habitsService.getElapsedTime(habit);
      this.elapsedTimes.set(habit.id, elapsed);
    });
  }

  checkNotifications(): void {
    this.habits.forEach((habit) => {
      if (this.habitsService.shouldShowNotification(habit)) {
        this.showNotification(habit);
        this.habitsService.updateNotificationDate(habit.id);
        this.loadHabits(); // Reload to get updated notification date
      }
    });
  }

  private showNotification(habit: Habit): void {
    const elapsed = this.habitsService.getElapsedTime(habit);
    const title = `¡Felicidades! 🎉`;
    const body = `Llevas ${elapsed.days} días sin ${habit.name.toLowerCase()}. ¡Sigue así!`;
    const icon = '/favicon.ico';

    if (Notification.permission === 'granted') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, { body, icon });
        });
      } else {
        new Notification(title, { body, icon });
      }
    }
  }

  onCreate(name: string): void {
    this.habitsService.createHabit(name);
    this.loadHabits();
    this.updateElapsedTimes();
  }

  onRelapse(id: string): void {
    this.habitsService.resetHabit(id);
    this.loadHabits();
    this.updateElapsedTimes();
  }

  onDelete(id: string): void {
    this.habitsService.deleteHabit(id);
    this.loadHabits();
    this.updateElapsedTimes();
  }

  getElapsedTime(habitId: string) {
    return this.elapsedTimes.get(habitId) || { days: 0, hours: 0, minutes: 0 };
  }
}
