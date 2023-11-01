import { Request, Response } from "express";
import { reports } from "../app";
import { UserReport } from "../types/report.interface";

export const getAllReports = async (req: Request, res: Response) => {
	const response = getExistedReports(reports);

	return res.status(200).json(response);
};

export const getExistedReports = (reports: UserReport[]): UserReport[] => {
	return reports;
};
