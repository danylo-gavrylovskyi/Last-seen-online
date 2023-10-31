import { Request, Response } from "express";
import { LastSeenUser } from "../types/lastSeenUser.interface";
import { fetchAllUsers } from "../services/user.service";
import { Users } from "../entities/users.class";
import { ResponseReport, UserReport } from "../types/report.interface";

interface ReceivedReport {
	userId: string;
	metrics: ResponseReport[];
}

export const getReport = async (req: Request, res: Response) => {
	const reportName = req.params.reportName as string;
	const from = req.query.date as string;
	const to = req.query.date as string;

	const result = retrieveReport();

	return res.status(200).json(result);
};

export const retrieveReport = (): ReceivedReport => {};
