import { getExistedReports } from "../../controllers/getAllReports.controller";
import { UserReport } from "../../types/report.interface";

describe("getExistedReports", () => {
	it("should return res with two reports inside", () => {
		const reports: UserReport[] = [
			{
				name: "testReport1",
				metrics: ["dailyAverage", "weeklyAverage"],
				users: ["user1"],
			},
			{
				name: "testReport2",
				metrics: ["total", "min"],
				users: ["user1"],
			},
		];
		const res = getExistedReports(reports);
		expect(res.length).toBe(2);
	});

	it("should return empty res when we do not have reports", () => {
		const reports: UserReport[] = [];
		const res = getExistedReports(reports);
		expect(res.length).toBeFalsy();
	});
});
