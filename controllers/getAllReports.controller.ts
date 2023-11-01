import { Request, Response } from "express";
import { users } from "../app";
import { UserReport } from "../types/report.interface";

export const getAllReports = async (req: Request, res: Response) => {
	const usersData = users.getData();

	const response = getExistedReports();

	return res.status(200).json(response);
};

export const getExistedReports = (): UserReport[] => {};
