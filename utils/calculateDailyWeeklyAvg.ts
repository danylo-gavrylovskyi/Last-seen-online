import { getWeekNumber } from "../controllers/predictUserOnlineStatus.controller";
import { LastSeenUser } from "../types/lastSeenUser.interface";
import { transformUser } from "../utils/transformer";

interface Averages {
	weeklyAverage: number | null;
	dailyAverage: number | null;
}

export const calculateDailyWeeklyAvg = (
	users: LastSeenUser[],
	userId: string,
	fromDate: Date,
	toDate: Date
): Averages => {
	const userData = users.filter((entry) => {
		if (
			entry.userId === userId &&
			entry.lastSeenDate &&
			entry.lastSeenDate.getTime() > fromDate.getTime() &&
			entry.lastSeenDate.getTime() < toDate.getTime()
		) {
			return entry;
		}
	});

	if (!userData.length) {
		return { weeklyAverage: null, dailyAverage: null };
	}

	const userTimeSpans = transformUser(userData);

	let totalOnlineTime: number = 0;
	let totalNumberOfDays: number = 0;
	let prevDay: number = -1;

	let prevWeek: string = "";
	let totalNumberOfWeeks: number = 0;

	userTimeSpans.forEach((timeSpan) => {
		if (!timeSpan.login || !timeSpan.logout) return;

		if (timeSpan.login.getDay() !== prevDay) {
			totalNumberOfDays++;
			prevDay = timeSpan.login?.getDay();
		}

		if (getWeekNumber(timeSpan.login) !== prevWeek) totalNumberOfWeeks++;

		totalOnlineTime += (timeSpan.logout.getTime() - timeSpan.login.getTime()) / 1000;
	});

	return {
		weeklyAverage: totalOnlineTime / totalNumberOfWeeks,
		dailyAverage: totalOnlineTime / totalNumberOfDays,
	};
};
