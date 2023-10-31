import { LastSeenUser } from "../types/lastSeenUser.interface";
import { transformUser } from "./transformer";

interface TotalOnlineTimeRes {
	totalTime: number | null;
}

export const getTotalOnlineTime = (
	data: LastSeenUser[],
	fromDate: Date,
	toDate: Date
): TotalOnlineTimeRes => {
	const userData = data.filter((entry) => {
		if (
			entry.lastSeenDate &&
			entry.lastSeenDate.getTime() > fromDate.getTime() &&
			entry.lastSeenDate.getTime() < toDate.getTime()
		) {
			return entry;
		}
	});

	if (!userData.length) {
		return { totalTime: null };
	}

	const userTimeSpans = transformUser(userData);

	let totalTime: number = 0;
	userTimeSpans.forEach((timeSpan) => {
		if (timeSpan.login && timeSpan.logout) {
			totalTime += (timeSpan.logout.getTime() - timeSpan.login.getTime()) / 1000;
		}
	});

	return { totalTime };
};
