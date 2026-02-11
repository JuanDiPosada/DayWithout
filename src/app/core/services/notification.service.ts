import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  notify(title: string, body: string, icon: string = '/favicon.ico'): void {
    console.log(`[NOTIFICATION] ${title}: ${body}`);

    if (!('Notification' in window)) {
      return;
    }

    if (Notification.permission === 'granted') {
      this.sendNotification(title, body, icon);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          this.sendNotification(title, body, icon);
        }
      });
    }
  }

  private sendNotification(title: string, body: string, icon: string): void {
    // Try to use Service Worker for better mobile support
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, {
          body,
          icon,
          badge: icon,
          vibrate: [200, 100, 200],
        } as any);
      });
    } else {
      // Fallback for desktop or when SW is not ready
      new Notification(title, { body, icon });
    }
  }

  requestPermission(): void {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }
}
