import { Request, Response } from "express";
import { LastSeenUser } from "../types/lastSeenUser.interface";
import { users } from "../app";

export const createReport = async (req: Request, res: Response) => {
	const reportName = req.params.reportName as string;

	const usersData = users.getData();

	const report = configureReport();

	return res.status(200).json(report);
};

export const configureReport = () => {
	return {};
};
