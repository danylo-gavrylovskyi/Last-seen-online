export interface UserReport {
	name: string;
	metrics: string[];
	users: string[];
}

export interface ResponseReport {
	dailyAverage?: number | null;
	weeklyAverage?: number | null;
	total?: number | null;
	min?: number | null;
	max?: number | null;
}
