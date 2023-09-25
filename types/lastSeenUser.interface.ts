export interface LastSeenUser {
	userId: string;
	nickname: string;
	firstName: string;
	lastName: string;
	registrationDate: Date;
	lastSeenDate: Date;
	isOnline: boolean;
}
