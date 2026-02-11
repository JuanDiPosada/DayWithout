import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  TimerService,
  TimerMode,
} from '../../../../core/services/timer.service';

interface PomodoroPreset {
  work: number;
  break: number;
  label: string;
}

@Component({
  selector: 'app-pomodoro-timer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './pomodoro-timer.html',
  styleUrl: './pomodoro-timer.css',
})
export class PomodoroTimer {
  private timerService = inject(TimerService);

  // Configuración de los presets
  presets: PomodoroPreset[] = [
    { work: 25, break: 5, label: '25/5' },
    { work: 50, break: 10, label: '50/10' },
    { work: 15, break: 3, label: '15/3' },
    { work: 10, break: 2, label: '10/2' },
  ];

  selectedPreset: PomodoroPreset = this.presets[0];

  // Observables from service
  timeLeft$ = this.timerService.timeLeft$;
  isRunning$ = this.timerService.isRunning$;
  mode$ = this.timerService.mode$;

  // Iniciar el temporizador
  startTimer(): void {
    const currentMode = this.getServiceMode();
    const duration =
      currentMode === 'work'
        ? this.selectedPreset.work
        : this.selectedPreset.break;
    this.timerService.startTimer(duration, currentMode);
  }

  // Pausar el temporizador
  pauseTimer(): void {
    this.timerService.pauseTimer();
  }

  // Resumir el temporizador
  resumeTimer(): void {
    this.timerService.resumeTimer();
  }

  // Detener y reiniciar el temporizador
  stopTimer(): void {
    this.timerService.stopTimer();
    this.resetTimer();
  }

  // Reiniciar el tiempo al valor original del modo actual
  resetTimer(): void {
    const currentMode = this.getServiceMode();
    const minutes =
      currentMode === 'work'
        ? this.selectedPreset.work
        : this.selectedPreset.break;
    this.timerService.resetTimer(minutes);
  }

  // Seleccionar un preset
  selectPreset(preset: PomodoroPreset): void {
    this.selectedPreset = preset;
    this.timerService.stopTimer();
    this.timerService.resetTimer(preset.work);
    // Note: mode is implicitly reset to 'work' in some cases or we can force it
  }

  // Helper sync getter for mode (internal use)
  private getServiceMode(): TimerMode {
    let mode: TimerMode = 'work';
    this.mode$.subscribe((m) => (mode = m)).unsubscribe();
    return mode;
  }

  // Formatear segundos a MM:SS
  formatTime(totalSeconds: number | null): string {
    if (totalSeconds === null) return '00:00';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(val: number): string {
    return val < 10 ? `0${val}` : `${val}`;
  }
}
