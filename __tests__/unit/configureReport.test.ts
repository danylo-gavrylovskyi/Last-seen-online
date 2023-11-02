import { configureReport } from "../../controllers/createReport.controller";

import { LastSeenUser } from "../../types/lastSeenUser.interface";
import { UserReport } from "../../types/report.interface";

describe("configureReport", () => {
	let mockUsers: LastSeenUser[] = [];
	let reports: UserReport[] = [];

	beforeEach(() => {
		mockUsers = [
			{
				userId: "1",
				nickname: "user1",
				firstName: "first",
				lastName: "user",
				registrationDate: new Date("01.01.2020"),
				lastSeenDate: new Date("05.10.2023"),
				isOnline: false,
			},
			{
				userId: "2",
				nickname: "user2",
				firstName: "second",
				lastName: "user",
				registrationDate: new Date("01.01.1990"),
				lastSeenDate: new Date("02.09.2023"),
				isOnline: false,
			},
		];

		reports = [];
	});

	it('should return res with "error" field inside if entered user does not exist', () => {
		const res = configureReport(
			mockUsers,
			"testReport",
			["999", "1"],
			["dailyAverage", "total"],
			reports
		);
		expect(res).toHaveProperty("error");
	});

	it('should return res with "error" field inside if report with such name already exists', () => {
		reports.push({ name: "testReport", metrics: ["total"], users: ["1"] });

		const res = configureReport(
			mockUsers,
			"testReport",
			["999", "1"],
			["dailyAverage", "total"],
			reports
		);
		expect(res).toHaveProperty("error");
	});

	it("should return empty res when report is being created", () => {
		const res = configureReport(
			mockUsers,
			"testReport",
			["1"],
			["dailyAverage", "total"],
			reports
		);

		expect(res).toStrictEqual({});
	});
});
