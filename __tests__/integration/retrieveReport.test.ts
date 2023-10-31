import { retrieveReport } from "../../controllers/getReport";
import { LastSeenUser } from "../../types/lastSeenUser.interface";
import { UserReport } from "../../types/report.interface";
import { calculateDailyWeeklyAvg } from "../../utils/calculateDailyWeeklyAvg";

describe("retrieveReport", () => {
	const reports: UserReport[] = [
		{
			name: "testReport1",
			metrics: ["dailyAverage", "weeklyAverage"],
			users: ["user1"],
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
		const res = retrieveReport(
			mockUsers,
			reports,
			"error",
			new Date("2022-01-01T10:00:00Z"),
			new Date("2024-08-01T15:00:00Z")
		);
		expect(res).toStrictEqual([]);
	});

	it("should return 'metrics' field with 'dailyAverage' and 'weeklyAverage' objects inside", () => {
		const res = retrieveReport(
			mockUsers,
			reports,
			"testReport1",
			new Date("2022-01-01T10:00:00Z"),
			new Date("2024-08-01T15:00:00Z")
		);

		if (!res) return undefined;

		expect(res[0].metrics[0]).toHaveProperty("dailyAverage");
		expect(res[0].metrics[1]).toHaveProperty("weeklyAverage");
	});

	it("should return daily and weekly averages for a user", () => {
		const res = retrieveReport(
			mockUsers,
			reports,
			"testReport1",
			new Date("2022-01-01T10:00:00Z"),
			new Date("2024-08-01T15:00:00Z")
		);

		const expectedDailyAvg = (3 * 3600) / 2;
		const expectedWeeklyAvg = (3 * 3600) / 2;

		if (!res) return undefined;

		expect(res[0].metrics[0].dailyAverage).toBe(expectedDailyAvg);
		expect(res[0].metrics[1].weeklyAverage).toBe(expectedWeeklyAvg);
	});
});
