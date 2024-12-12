import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Attendance } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private attendanceRecords: Attendance[] = [];

  markAttendance(employeeId: number): Observable<Attendance> {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const existingRecord = this.attendanceRecords.find(
      record => record.employeeId === employeeId && 
      new Date(record.date).getTime() === today.getTime()
    );

    if (existingRecord) {
      existingRecord.checkOut = now;
      return of(existingRecord);
    }

    const newRecord: Attendance = {
      id: this.attendanceRecords.length + 1,
      employeeId,
      date: today,
      checkIn: now,
      checkOut: null,
      status: now.getHours() >= 9 ? 'late' : 'present'
    };

    this.attendanceRecords.push(newRecord);
    return of(newRecord);
  }

  getAttendanceHistory(employeeId: number): Observable<Attendance[]> {
    return of(this.attendanceRecords.filter(record => record.employeeId === employeeId));
  }
}