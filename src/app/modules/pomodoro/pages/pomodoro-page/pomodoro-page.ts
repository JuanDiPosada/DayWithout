import { Component } from '@angular/core';
import { PomodoroTimer } from '../../components/pomodoro-timer/pomodoro-timer';

@Component({
  selector: 'app-pomodoro-page',
  standalone: true,
  imports: [PomodoroTimer],
  templateUrl: './pomodoro-page.html',
  styleUrl: './pomodoro-page.css',
})
export class PomodoroPage {}
