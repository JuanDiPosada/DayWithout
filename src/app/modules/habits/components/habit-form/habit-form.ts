import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './habit-form.html',
  styleUrl: './habit-form.css',
})
export class HabitForm {
  @Output() create = new EventEmitter<string>();
  habitName = '';

  onSubmit(): void {
    if (this.habitName.trim()) {
      this.create.emit(this.habitName.trim());
      this.habitName = '';
    }
  }
}
