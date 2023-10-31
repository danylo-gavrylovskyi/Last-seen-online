import { getWeekNumber } from "../controllers/predictUserOnlineStatus.controller";
import { LastSeenUser } from "../types/lastSeenUser.interface";
import { transformUser } from "../utils/transformer";

interface MinMax {
	min: number | null;
	max: number | null;
}

export const getMinMaxDaily = (
	givenUserData: LastSeenUser[],
	fromDate: Date,
	toDate: Date
): MinMax => {
	const userData = givenUserData.filter((entry) => {
		if (
			entry.lastSeenDate &&
			entry.lastSeenDate.getTime() > fromDate.getTime() &&
			entry.lastSeenDate.getTime() < toDate.getTime()
		) {
			return entry;
		}
	});

	if (!userData.length) {
		return { min: null, max: null };
	}

	const userTimeSpans = transformUser(userData);

	let minTimeSpan: number = -1;
	let maxTimeSpan: number = -1;

	userTimeSpans.forEach((timeSpan, index) => {
		if (!timeSpan.login || !timeSpan.logout) return;

		if (index === 0) {
			minTimeSpan = (timeSpan.logout.getTime() - timeSpan.login.getTime()) / 1000;
			maxTimeSpan = (timeSpan.logout.getTime() - timeSpan.login.getTime()) / 1000;
		}

		if ((timeSpan.logout.getTime() - timeSpan.login.getTime()) / 1000 < minTimeSpan) {
			minTimeSpan = (timeSpan.logout.getTime() - timeSpan.login.getTime()) / 1000;
		}
		if ((timeSpan.logout.getTime() - timeSpan.login.getTime()) / 1000 > maxTimeSpan) {
			maxTimeSpan = (timeSpan.logout.getTime() - timeSpan.login.getTime()) / 1000;
		}
	});

	return { min: minTimeSpan, max: maxTimeSpan };
};
