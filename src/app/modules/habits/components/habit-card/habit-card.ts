import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habit } from '../../../../core/models/habit.model';

@Component({
  selector: 'app-habit-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './habit-card.html',
  styleUrl: './habit-card.css',
})
export class HabitCard {
  @Input() habit!: Habit;
  @Input() elapsedTime!: { days: number; hours: number; minutes: number };
  @Output() relapse = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onRelapse(): void {
    if (
      confirm(`¿Estás seguro de que quieres reiniciar "${this.habit.name}"?`)
    ) {
      this.relapse.emit(this.habit.id);
    }
  }

  onDelete(): void {
    if (
      confirm(`¿Estás seguro de que quieres eliminar "${this.habit.name}"?`)
    ) {
      this.delete.emit(this.habit.id);
    }
  }
}
