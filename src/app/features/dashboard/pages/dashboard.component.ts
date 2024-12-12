import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AttendanceHistoryComponent } from '../components/attendance-history/attendance-history.component';
import { AttendanceActionsComponent } from '../components/attendance-actions/attendance-actions.component';
import { AuthService } from '../../../core/services/auth.service';
import { AttendanceService } from '../../../core/services/attendance.service';
import { Attendance } from '../../../core/models/attendance.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AttendanceHistoryComponent, AttendanceActionsComponent],
  template: `
    <div class="dashboard-container">
      <header>
        <h1>Welcome, {{userName}}</h1>
        <button (click)="logout()">Logout</button>
      </header>

      <app-attendance-actions
        [isCheckedIn]="isCheckedIn"
        (markAttendance)="markAttendance()"
      ></app-attendance-actions>

      <app-attendance-history
        [records]="attendanceHistory"
      ></app-attendance-history>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .attendance-actions {
      margin-bottom: 2rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 0.75rem;
      border: 1px solid #ddd;
      text-align: left;
    }

    th {
      background-color: #f5f5f5;
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class DashboardComponent implements OnInit {
  userName = '';
  isCheckedIn = false;
  attendanceHistory: Attendance[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.name;
      this.loadAttendanceHistory(user.id);
    } else {
      this.router.navigate(['/login']);
    }
  }

  markAttendance(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.attendanceService.markAttendance(user.id).subscribe(record => {
        this.isCheckedIn = !record.checkOut;
        this.loadAttendanceHistory(user.id);
      });
    }
  }

  loadAttendanceHistory(employeeId: number): void {
    this.attendanceService.getAttendanceHistory(employeeId).subscribe(
      history => this.attendanceHistory = history
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}