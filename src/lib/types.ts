/**
 * Keep this file updated with the latest backend types
 */

export interface User {
	// Commented out fields are not passed to the frontend

	id: string;
	// uid: string;
	// name: string;
	role: 'student' | 'staff' | 'admin';
	// email: string;
	// phone: string;
	// birthDate?: string;
	status?: string;
	// otherStatus?: string;
	province?: string;
	// school?: string;
	selectedSources?: string[];
	otherSource?: string;
	firstInterest?: string;
	secondInterest?: string;
	thirdInterest?: string;
	// objective?: string;
	registeredAt?: string;
	lastEntered?: string;

	// For staff/admin only
	faculty?: string;
	// studentID?: string;
	// nickname?: string;
	// year?: number;
	isCentralStaff?: boolean;
}

export interface StudentTransaction {
	// Commented out fields are not passed to the frontend

	id: string;
	studentId: string;
	faculty: string;
	registeredAt: string;
}

export interface Faculty {
	faculty: string;
	first_interest: number;
	second_interest: number;
	third_interest: number;
}

export interface KnownSource {
	source: string;
	count: number;
}
