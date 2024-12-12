export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  employeeId: string;
}

export interface Attendance {
  id: number;
  employeeId: number;
  date: Date;
  checkIn: Date;
  checkOut: Date | null;
  status: 'present' | 'absent' | 'late' | 'half-day';
}