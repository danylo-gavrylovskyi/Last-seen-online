export interface UserReport {
	name: string;
	metrics: string[];
	users: string[];
}

export interface ResponseReport {
	dailyAverage?: number;
	weeklyAverage?: number;
	total?: number;
	min?: number;
	max?: number;
}
