import { Request, Response } from "express";
import { LastSeenUser } from "../types/lastSeenUser.interface";
import { fetchAllUsers } from "../services/user.service";
import { LastSeenUserResult } from "../types/lastSeenUserResult.interface";
import { Users } from "../entities/users.class";
import { transformUser } from "../utils/transformer";
import { users } from "../app";
import { getWeekNumber } from "./predictUserOnlineStatus.controller";

interface Averages {
	weeklyAverage: number | null;
	dailyAverage: number | null;
}

export const getDailyWeeklyTimeAverages = async (req: Request, res: Response) => {
	const userId = req.query.userId as string;

	const usersData = users.getData();

	const averages = calculateAverages(usersData, userId);

	return res.status(200).json(averages);
};

export const calculateAverages = (users: LastSeenUser[], userId: string): Averages => {
	const userData = users.filter((entry) => entry.userId === userId);

	if (!userData.length) {
		return { weeklyAverage: null, dailyAverage: null };
	}

	const userTimeSpans = transformUser(userData);

	let totalOnlineTime: number = 0;
	let totalNumberOfDays: number = 0;
	let prevDay: number = -1;

	let prevWeek: string = "";
	let totalNumberOfWeeks: number = 0;

	userTimeSpans.forEach((timeSpan) => {
		if (!timeSpan.login || !timeSpan.logout) return;

		if (timeSpan.login.getDay() !== prevDay) {
			totalNumberOfDays++;
			prevDay = timeSpan.login?.getDay();
		}

		if (getWeekNumber(timeSpan.login) !== prevWeek) totalNumberOfWeeks++;

		totalOnlineTime += (timeSpan.logout.getTime() - timeSpan.login.getTime()) / 1000;
	});

	return {
		weeklyAverage: totalOnlineTime / totalNumberOfWeeks,
		dailyAverage: totalOnlineTime / totalNumberOfDays,
	};
};
