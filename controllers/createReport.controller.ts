import { Request, Response } from "express";

import { reports, users } from "../app";

import { LastSeenUser } from "../types/lastSeenUser.interface";
import { UserReport } from "../types/report.interface";

export const createReport = async (req: Request, res: Response) => {
	const reportName = req.params.reportName as string;
	const usersForReport = req.query.users as string;
	const metrics = req.query.metrics as string;

	const usersData = users.getData();

	const report = configureReport(
		usersData,
		reportName,
		usersForReport.split(","),
		metrics.split(","),
		reports
	);

	return res.status(200).json(report);
};

export const configureReport = (
	usersData: LastSeenUser[],
	reportName: string,
	usersForReport: string[],
	metrics: string[] = ["dailyAverage", "total", "weeklyAverage", "min", "max"],
	reports: UserReport[]
) => {
	for (let userToReport of usersForReport) {
		if (!usersData.find((user) => user.userId === userToReport)) {
			return { error: "Check entered users" };
		}
	}

	if (reports.find((report) => report.name === reportName)) {
		return { error: "Report with such name already exists" };
	}

	reports.push({ name: reportName, metrics, users: usersForReport });

	return {};
};
