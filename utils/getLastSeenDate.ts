import * as constants from "../constants";

export const getLastSeenDate = (date: Date): string => {
	const lastSeenInMilliseconds: number = Date.now() - +date;
	const lastSeenInSeconds: number = lastSeenInMilliseconds / constants.MILLISECONDS_IN_SECOND;
	const lastSeenInMinutes: number = lastSeenInSeconds / constants.SECONDS_IN_MINUTE;
	const lastSeenInHours: number = lastSeenInMinutes / constants.MINUTES_IN_HOUR;
	const lastSeenInDays: number = lastSeenInHours / constants.HOURS_IN_DAY;

	if (lastSeenInSeconds >= 0 && lastSeenInSeconds < 30) {
		return constants.JUST_NOW;
	} else if (lastSeenInSeconds >= 30 && lastSeenInSeconds < 60) {
		return constants.LESS_THAN_MINUTE_AGO;
	} else if (lastSeenInMinutes >= 1 && lastSeenInMinutes < 59) {
		return constants.COUPLE_OF_MINUTES_AGO;
	} else if (lastSeenInHours >= 1 && lastSeenInHours < 2) {
		return constants.HOUR_AGO;
	} else if (lastSeenInHours >= 2 && lastSeenInHours < 24) {
		return constants.TODAY;
	} else if (lastSeenInHours >= 24 && lastSeenInHours < 48) {
		return constants.YESTERDAY;
	} else if (lastSeenInDays >= 2 && lastSeenInDays < 7) {
		return constants.THIS_WEEK;
	} else {
		return constants.LONG_TIME_AGO;
	}
};
