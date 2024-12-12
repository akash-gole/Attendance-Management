import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Attendance } from '../../../../core/models/attendance.model';

@Component({
  selector: 'app-attendance-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="attendance-history">
      <h2>Attendance History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let record of records">
            <td>{{record.date | date}}</td>
            <td>{{record.checkIn | date:'shortTime'}}</td>
            <td>{{record.checkOut | date:'shortTime'}}</td>
            <td>{{record.status}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class AttendanceHistoryComponent {
  @Input() records: Attendance[] = [];
}