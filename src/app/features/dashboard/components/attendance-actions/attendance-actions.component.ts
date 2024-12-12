import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance-actions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="attendance-actions">
      <button (click)="onMarkAttendance()">
        {{isCheckedIn ? 'Check Out' : 'Check In'}}
      </button>
    </div>
  `
})
export class AttendanceActionsComponent {
  @Input() isCheckedIn = false;
  @Output() markAttendance = new EventEmitter<void>();

  onMarkAttendance(): void {
    this.markAttendance.emit();
  }
}