import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio = new Audio();

  constructor() {}

  playSound(soundPath: string): void {
    this.audio.src = soundPath;
    this.audio.load();
    this.audio
      .play()
      .catch((err) => console.error('Error playing audio:', err));
  }

  stopSound(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
