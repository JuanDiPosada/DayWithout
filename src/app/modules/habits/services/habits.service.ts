import { Injectable } from '@angular/core';
import { Habit } from '../../../core/models/habit.model';

@Injectable({
  providedIn: 'root',
})
export class HabitsService {
  constructor() {}

  getHabits(): Habit[] {
    return [];
  }
}
