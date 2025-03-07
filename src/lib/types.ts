/**
 * Keep this file updated with the latest backend types
 */

export enum Role {
  Student = "student",
  Staff = "staff",
  Admin = "admin",
}

export interface User {
  id: string;
  uid: string;
  name: string;
  role: Role;
  email: string;
  phone: string;
  birthDate?: string;
  status?: string;
  otherStatus?: string;
  province?: string;
  school?: string;
  selectedSources?: string[];
  otherSource?: string;
  firstInterest?: string;
  secondInterest?: string;
  thirdInterest?: string;
  objective?: string;
  registeredAt?: string;
  lastEntered?: string;

  // For staff/admin only
  faculty?: string;
  studentID?: string;
  nickname?: string;
  year?: number;
  isCentralStaff?: boolean;
}

export interface StudentTransaction {
  id: string;
  studentId: string;
  faculty: string;
  registeredAt: string;
}