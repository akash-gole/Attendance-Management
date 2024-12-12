import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Attendance, AttendanceStatus } from '../models/attendance.model';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private attendanceRecords: Attendance[] = [];

  markAttendance(employeeId: number): Observable<Attendance> {
    const now = new Date();
    const existingRecord = this.findTodayAttendance(employeeId, now);

    if (existingRecord) {
      return this.checkOut(existingRecord, now);
    }

    return this.checkIn(employeeId, now);
  }

  private findTodayAttendance(employeeId: number, now: Date): Attendance | undefined {
    const today = format(now, 'yyyy-MM-dd');
    return this.attendanceRecords.find(record => 
      record.employeeId === employeeId && 
      format(new Date(record.date), 'yyyy-MM-dd') === today
    );
  }

  private checkIn(employeeId: number, now: Date): Observable<Attendance> {
    const status = this.determineStatus(now);
    const newRecord: Attendance = {
      id: this.generateId(),
      employeeId,
      date: now,
      checkIn: now,
      checkOut: null,
      status
    };

    this.attendanceRecords.push(newRecord);
    return of(newRecord);
  }

  private checkOut(record: Attendance, now: Date): Observable<Attendance> {
    record.checkOut = now;
    return of(record);
  }

  private determineStatus(now: Date): AttendanceStatus {
    return now.getHours() >= 9 ? 'late' : 'present';
  }

  private generateId(): number {
    return this.attendanceRecords.length + 1;
  }

  getAttendanceHistory(employeeId: number): Observable<Attendance[]> {
    return of(this.attendanceRecords.filter(record => record.employeeId === employeeId));
  }
}