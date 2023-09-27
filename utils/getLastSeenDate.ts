import * as constants from "../constants";
import * as localization from "../localization";

export const getLastSeenDate = (date: Date, selectedLanguage: "en" | "ua"): string => {
	const lastSeenInMilliseconds: number = Date.now() - +date;
	const lastSeenInSeconds: number = lastSeenInMilliseconds / constants.MILLISECONDS_IN_SECOND;
	const lastSeenInMinutes: number = lastSeenInSeconds / constants.SECONDS_IN_MINUTE;
	const lastSeenInHours: number = lastSeenInMinutes / constants.MINUTES_IN_HOUR;
	const lastSeenInDays: number = lastSeenInHours / constants.HOURS_IN_DAY;

	const lang = localization[selectedLanguage];

	if (lastSeenInSeconds >= 0 && lastSeenInSeconds < 30) {
		return lang.justNow;
	} else if (lastSeenInSeconds >= 30 && lastSeenInSeconds < 60) {
		return lang.lessThanMinuteAgo;
	} else if (lastSeenInMinutes >= 1 && lastSeenInMinutes < 59) {
		return lang.coupleOfMinutesAgo;
	} else if (lastSeenInHours >= 1 && lastSeenInHours < 2) {
		return lang.hourAgo;
	} else if (lastSeenInHours >= 2 && lastSeenInHours < 24) {
		return lang.today;
	} else if (lastSeenInHours >= 24 && lastSeenInHours < 48) {
		return lang.yesterday;
	} else if (lastSeenInDays >= 2 && lastSeenInDays < 7) {
		return lang.thisWeek;
	} else {
		return lang.longTimeAgo;
	}
};
