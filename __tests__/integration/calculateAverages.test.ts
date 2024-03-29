import { calculateAverages } from "../../controllers/getDailyWeeklyTimeAverages.controller";
import { LastSeenUser } from "../../types/lastSeenUser.interface";

describe("calculateAverages", () => {
	const mockUsers: LastSeenUser[] = [
		{
			userId: "user1",
			isOnline: true,
			lastSeenDate: new Date("2023-01-01T10:00:00Z"),
			nickname: "",
			lastName: "",
			firstName: "",
			registrationDate: new Date(),
		},
		{
			userId: "user1",
			isOnline: false,
			lastSeenDate: new Date("2023-01-01T12:00:00Z"),
			nickname: "",
			lastName: "",
			firstName: "",
			registrationDate: new Date(),
		},
		{
			userId: "user1",
			isOnline: true,
			lastSeenDate: new Date("2023-08-01T14:00:00Z"),
			nickname: "",
			lastName: "",
			firstName: "",
			registrationDate: new Date(),
		},
		{
			userId: "user1",
			isOnline: false,
			lastSeenDate: new Date("2023-08-01T15:00:00Z"),
			nickname: "",
			lastName: "",
			firstName: "",
			registrationDate: new Date(),
		},
	];

	it('should return res with "weeklyAverage" and "dailyAverage" fields inside', () => {
		const res = calculateAverages(mockUsers, "user1");
		expect(res).toHaveProperty("weeklyAverage");
		expect(res).toHaveProperty("dailyAverage");
	});

	it('should return res where "weeklyAverage" and "dailyAverage" fields are null if there is no needed data', () => {
		const res = calculateAverages([], "user1");
		expect(res.dailyAverage).toBeNull();
		expect(res.weeklyAverage).toBeNull();
	});

	it("should return daily and weekly averages for a user", () => {
		const averages = calculateAverages(mockUsers, "user1");

		const expectedDailyAvg = (3 * 3600) / 2;
		const expectedWeeklyAvg = (3 * 3600) / 2;

		expect(averages.dailyAverage).toBe(expectedDailyAvg);
		expect(averages.weeklyAverage).toBe(expectedWeeklyAvg);
	});
});
