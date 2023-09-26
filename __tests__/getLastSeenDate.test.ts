import { getLastSeenDate } from "../utils/getLastSeenDate";

import * as constants from "../constants";

describe("getLastSeenDate", () => {
	it("should return 'just now' when user was online less than 30 seconds ago", () => {
		const now = new Date();
		expect(getLastSeenDate(now)).toBe(constants.JUST_NOW);
	});

	it("should return 'less than a minute ago' when user was online between 30 and 60 seconds ago", () => {
		const thirtySeconds = 30 * constants.MILLISECONDS_IN_SECOND;
		const dateOneSecondAgo = new Date(Date.now() - thirtySeconds);
		expect(getLastSeenDate(dateOneSecondAgo)).toBe(constants.LESS_THAN_MINUTE_AGO);
	});

	it("should return 'couple of minutes ago' when user was online between 1 and 59 minutes ago", () => {
		const tenMinutes = 10 * constants.SECONDS_IN_MINUTE * constants.MILLISECONDS_IN_SECOND;
		const dateTenMinutesAgo = new Date(Date.now() - tenMinutes);
		expect(getLastSeenDate(dateTenMinutesAgo)).toBe(constants.COUPLE_OF_MINUTES_AGO);
	});

	it("should return 'hour ago' when user was online between 1 and 2 hours ago", () => {
		const oneHour = constants.ONE_HOUR_IN_MILLISECONDS;
		const dateOneHourAgo = new Date(Date.now() - oneHour);
		expect(getLastSeenDate(dateOneHourAgo)).toBe(constants.HOUR_AGO);
	});

	it("should return 'today' when user was online between 2 and 24 hours ago", () => {
		const fiveHours = constants.ONE_HOUR_IN_MILLISECONDS * 5;
		const dateFiveHoursAgo = new Date(Date.now() - fiveHours);
		expect(getLastSeenDate(dateFiveHoursAgo)).toBe(constants.TODAY);
	});

	it("should return 'yesterday' when user was online between 24 and 48 hours ago", () => {
		const twentyFourHours = constants.ONE_HOUR_IN_MILLISECONDS * 24;
		const dateTwentyFourHoursAgo = new Date(Date.now() - twentyFourHours);
		expect(getLastSeenDate(dateTwentyFourHoursAgo)).toBe(constants.YESTERDAY);
	});

	it("should return 'this week' when user was online between 2 and 7 days ago", () => {
		const twoDays = constants.ONE_HOUR_IN_MILLISECONDS * 48;
		const dateTwoDaysAgo = new Date(Date.now() - twoDays);
		expect(getLastSeenDate(dateTwoDaysAgo)).toBe(constants.THIS_WEEK);
	});

	it("should return 'long time ago' when user was online more than 7 days ago", () => {
		const eightDays = constants.ONE_HOUR_IN_MILLISECONDS * 24 * 8;
		const dateEightDaysAgo = new Date(Date.now() - eightDays);
		expect(getLastSeenDate(dateEightDaysAgo)).toBe(constants.LONG_TIME_AGO);
	});
});
