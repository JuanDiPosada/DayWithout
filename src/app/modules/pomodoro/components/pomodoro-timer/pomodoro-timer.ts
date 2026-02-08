import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

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
export class PomodoroTimer implements OnDestroy {
  // Configuración de los presets
  presets: PomodoroPreset[] = [
    { work: 25, break: 5, label: '25/5' },
    { work: 50, break: 10, label: '50/10' },
    { work: 15, break: 3, label: '15/3' },
    { work: 10, break: 2, label: '10/2' },
  ];

  selectedPreset: PomodoroPreset = this.presets[0];
  timeLeft: number = this.selectedPreset.work * 60;
  isRunning = false;
  mode: 'work' | 'break' = 'work'; // 'work' o 'break'

  private timer: any;

  ngOnDestroy(): void {
    this.stopTimer();
  }

  // Iniciar el temporizador
  startTimer(): void {
    if (this.isRunning) return;

    // Solicitar permiso para notificaciones si no se ha otorgado aún
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    this.isRunning = true;
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        // El tiempo terminó
        this.playNotificationSound();
        this.showNotification(); // Mostrar notificación web
        this.switchMode();
      }
    }, 1000);
  }

  // ... (otros métodos)

  private showNotification(): void {
    const title =
      this.mode === 'work' ? '¡Tiempo de descanso!' : '¡A trabajar!';
    const body =
      this.mode === 'work'
        ? 'Has completado tu sesión de enfoque. Tómate un respiro.'
        : 'El descanso ha terminado. Es hora de volver a enfocarse.';
    const icon = '/favicon.ico';

    if (Notification.permission === 'granted') {
      // Intentar usar Service Worker para la notificación (mejor soporte móvil)
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, { body, icon });
        });
      } else {
        // Fallback para escritorio sin SW
        new Notification(title, { body, icon });
      }
    }
  }

  // Pausar el temporizador
  pauseTimer(): void {
    this.isRunning = false;
    clearInterval(this.timer);
  }

  // Detener y reiniciar el temporizador
  stopTimer(): void {
    this.pauseTimer();
    this.resetTimer();
  }

  // Reiniciar el tiempo al valor original del modo actual
  resetTimer(): void {
    const minutes =
      this.mode === 'work'
        ? this.selectedPreset.work
        : this.selectedPreset.break;
    this.timeLeft = minutes * 60;
  }

  // Seleccionar un preset
  selectPreset(preset: PomodoroPreset): void {
    this.selectedPreset = preset;
    this.mode = 'work'; // Siempre empezar en modo trabajo al cambiar preset
    this.stopTimer();
  }

  // Cambiar entre modo trabajo y descanso automáticamente
  switchMode(): void {
    this.pauseTimer();
    if (this.mode === 'work') {
      this.mode = 'break';
      this.timeLeft = this.selectedPreset.break * 60;
    } else {
      this.mode = 'work';
      this.timeLeft = this.selectedPreset.work * 60;
    }
    // Opcional: Auto-start siguiente fase
    // this.startTimer();
  }

  // Formatear segundos a MM:SS
  get formatTime(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(val: number): string {
    return val < 10 ? `0${val}` : `${val}`;
  }

  private playNotificationSound(): void {
    // Implementar sonido real aquí si se desea
    console.log('Ding!');
  }
}
