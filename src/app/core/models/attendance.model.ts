export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half-day';

export interface Attendance {
  id: number;
  employeeId: number;
  date: Date;
  checkIn: Date;
  checkOut: Date | null;
  status: AttendanceStatus;
}