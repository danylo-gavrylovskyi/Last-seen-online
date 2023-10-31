import { retrieveReport } from "../../controllers/getReport";
import { LastSeenUser } from "../../types/lastSeenUser.interface";
import { UserReport } from "../../types/report.interface";
import { calculateDailyWeeklyAvg } from "../../utils/calculateDailyWeeklyAvg";

describe("retrieveReport", () => {
	const reports: UserReport[] = [
		{
			name: "testReport1",
			metrics: ["dailyAverage", "weeklyAverage "],
			users: ["1"],
		},
	];
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

	it("should return empty object if report is not found", () => {
		const res = retrieveReport(reports);
		expect(res).toStrictEqual({});
	});

	it("should return 'metrics' field with 'dailyAverage' and 'weeklyAverage' objects inside", () => {
		const res = retrieveReport(mockUsers, reports);
		expect(res.metrics[0]).toHaveProperty("dailyAverage");
		expect(res.metrics[1]).toHaveProperty("weeksAverage");
	});

	it("should return daily and weekly averages for a user", () => {
		const averages = calculateDailyWeeklyAvg(
			mockUsers,
			"user1",
			new Date("2022-01-01T10:00:00Z"),
			new Date("2024-08-01T15:00:00Z")
		);

		const expectedDailyAvg = (3 * 3600) / 2;
		const expectedWeeklyAvg = (3 * 3600) / 2;

		expect(averages.dailyAverage).toBe(expectedDailyAvg);
		expect(averages.weeklyAverage).toBe(expectedWeeklyAvg);
	});
});
