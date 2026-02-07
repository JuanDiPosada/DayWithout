import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timeLeft = new BehaviorSubject<number>(25 * 60);
  timeLeft$ = this.timeLeft.asObservable();

  private timerSubscription?: Subscription;

  constructor() {}

  startTimer(durationMinutes: number): void {
    this.stopTimer();
    let seconds = durationMinutes * 60;
    this.timeLeft.next(seconds);

    this.timerSubscription = interval(1000)
      .pipe(takeWhile(() => seconds > 0))
      .subscribe(() => {
        seconds--;
        this.timeLeft.next(seconds);
      });
  }

  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  resetTimer(durationMinutes: number): void {
    this.stopTimer();
    this.timeLeft.next(durationMinutes * 60);
  }
}
