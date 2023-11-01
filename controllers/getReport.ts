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

interface ReportWithGlobalMetrics {
	users: ReceivedReport[];
	dailyAverage?: number | null;
	weeklyAverage?: number | null;
	total?: number | null;
	min?: number | null;
	max?: number | null;
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
): ReportWithGlobalMetrics => {
	const report = reports.find((rep) => rep.name === reportName);
	if (!report) return { users: [] };

	const resUsersField: ReceivedReport[] = [];
	const response: ReportWithGlobalMetrics = { users: [] };

	let dailyTotal = 0;
	let weeklyTotal = 0;
	let globalTotalTime = 0;
	let globalMin: number = 0;
	let globalMax: number = 0;

	report.users.forEach((userFromReport) => {
		const userData = users.filter((user) => user.userId === userFromReport);
		const metrics: ResponseReport[] = [];

		report.metrics.forEach((metric) => {
			switch (metric) {
				case "dailyAverage": {
					const averages = calculateDailyWeeklyAvg(userData, from, to);
					metrics.push({ dailyAverage: averages.dailyAverage });
					dailyTotal += averages.dailyAverage ?? 0;
					break;
				}
				case "weeklyAverage": {
					const averages = calculateDailyWeeklyAvg(userData, from, to);
					metrics.push({ weeklyAverage: averages.weeklyAverage });
					weeklyTotal += averages.weeklyAverage ?? 0;
					break;
				}
				case "total": {
					const total = getTotalOnlineTime(userData, from, to);
					metrics.push({ total: total.totalTime });
					globalTotalTime += total.totalTime ?? 0;
					break;
				}
				case "min": {
					const { min } = getMinMaxDaily(userData, from, to);
					metrics.push({ min });
					if (globalMin && min) {
						if (globalMin > min) globalMin = min;
					} else if (!globalMin && min) {
						globalMin = min;
					}
					break;
				}
				case "max": {
					const { max } = getMinMaxDaily(userData, from, to);
					metrics.push({ max });
					if (globalMax && max) {
						if (globalMax < max) globalMax = max;
					} else if (!globalMax && max) {
						globalMax = max;
					}
					break;
				}
				default:
					break;
			}
		});

		resUsersField.push({ userId: userFromReport, metrics });
	});

	if (dailyTotal) response.dailyAverage = dailyTotal / report.users.length;
	if (weeklyTotal) response.weeklyAverage = weeklyTotal / report.users.length;
	if (globalTotalTime) response.total = globalTotalTime;
	if (globalMin) response.min = globalMin;
	if (globalMax) response.max = globalMax;
	response.users = resUsersField;

	return response;
};
