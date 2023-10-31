import { Request, Response } from "express";
import { LastSeenUser } from "../types/lastSeenUser.interface";
import { ResponseReport, UserReport } from "../types/report.interface";
import { calculateDailyWeeklyAvg } from "../utils/calculateDailyWeeklyAvg";
import { reports, users } from "../app";
import { getTotalOnlineTime } from "../utils/getTotalOnlineTime";
import { getMinMaxDaily } from "../utils/getMinMaxDaily";

interface ReceivedReport {
	userId: string;
	metrics: ResponseReport[];
}

export const getReport = async (req: Request, res: Response) => {
	const reportName = req.params.reportName as string;
	const from = req.query.date as string;
	const to = req.query.date as string;

	const usersData = users.getData();

	const result = retrieveReport(usersData, reports, reportName, new Date(from), new Date(to));

	return res.status(200).json(result);
};

export const retrieveReport = (
	users: LastSeenUser[],
	reports: UserReport[],
	reportName: string,
	from: Date,
	to: Date
): ReceivedReport[] | undefined => {
	const report = reports.find((rep) => rep.name === reportName);
	if (!report) return [];

	let response: ReceivedReport[] = [];

	report.users.forEach((userFromReport) => {
		const userData = users.filter((user) => user.userId === userFromReport);
		const metrics: ResponseReport[] = [];

		report.metrics.forEach((metric) => {
			switch (metric) {
				case "dailyAverage": {
					const averages = calculateDailyWeeklyAvg(userData, from, to);
					metrics.push({ dailyAverage: averages.dailyAverage });
					break;
				}
				case "weeklyAverage": {
					const averages = calculateDailyWeeklyAvg(userData, from, to);
					metrics.push({ weeklyAverage: averages.weeklyAverage });
					break;
				}
				case "total": {
					const total = getTotalOnlineTime(userData, from, to);
					metrics.push({ total: total.totalTime });
					break;
				}
				case "min": {
					const { min } = getMinMaxDaily(userData, from, to);
					metrics.push({ min });
					break;
				}
				case "max": {
					const { max } = getMinMaxDaily(userData, from, to);
					metrics.push({ max });
					break;
				}
				default:
					break;
			}
		});

		response.push({ userId: userFromReport, metrics });
	});

	return response;
};
