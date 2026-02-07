import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  notify(message: string, type: 'info' | 'success' | 'error' = 'info'): void {
    // For now, using browser alerts or log. Could be replaced with snackbar later.
    console.log(`[${type.toUpperCase()}] ${message}`);
    // if ('Notification' in window && Notification.permission === 'granted') {
    //   new Notification(message);
    // }
  }

  requestPermission(): void {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }
}
