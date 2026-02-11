import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { NotificationService } from './notification.service';
import { AudioService } from './audio.service';

export type TimerMode = 'work' | 'break';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private notificationService = inject(NotificationService);
  private audioService = inject(AudioService);

  private timeLeft = new BehaviorSubject<number>(25 * 60);
  timeLeft$ = this.timeLeft.asObservable();

  private isRunning = new BehaviorSubject<boolean>(false);
  isRunning$ = this.isRunning.asObservable();

  private mode = new BehaviorSubject<TimerMode>('work');
  mode$ = this.mode.asObservable();

  private expectedEndTime?: number;
  private timerSubscription?: Subscription;

  constructor() {}

  startTimer(durationMinutes: number, mode: TimerMode = 'work'): void {
    this.stopTimer();
    this.mode.next(mode);
    const seconds = durationMinutes * 60;
    this.expectedEndTime = Date.now() + seconds * 1000;
    this.isRunning.next(true);

    this.timerSubscription = interval(1000).subscribe(() => {
      this.updateTimer();
    });
  }

  private updateTimer(): void {
    if (!this.expectedEndTime) return;

    const remaining = Math.max(
      0,
      Math.round((this.expectedEndTime - Date.now()) / 1000),
    );
    this.timeLeft.next(remaining);

    if (remaining === 0) {
      this.handleTimerComplete();
    }
  }

  private handleTimerComplete(): void {
    this.stopTimer();
    const currentMode = this.mode.value;

    const title =
      currentMode === 'work' ? '¡Tiempo de descanso!' : '¡A trabajar!';
    const body =
      currentMode === 'work'
        ? 'Has completado tu sesión de enfoque. Tómate un respiro.'
        : 'El descanso ha terminado. Es hora de volver a enfocarse.';

    this.notificationService.notify(title, body);
    this.audioService.playSound('/assets/sounds/notification.mp3'); // Assuming sound path
  }

  pauseTimer(): void {
    this.stopTimer();
    const remainingSeconds = this.timeLeft.value;
    this.expectedEndTime = undefined;
  }

  resumeTimer(): void {
    if (this.expectedEndTime) return;
    const remainingSeconds = this.timeLeft.value;
    this.expectedEndTime = Date.now() + remainingSeconds * 1000;
    this.isRunning.next(true);
    this.timerSubscription = interval(1000).subscribe(() => {
      this.updateTimer();
    });
  }

  stopTimer(): void {
    this.isRunning.next(false);
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  resetTimer(durationMinutes: number): void {
    this.stopTimer();
    this.timeLeft.next(durationMinutes * 60);
    this.expectedEndTime = undefined;
  }
}
