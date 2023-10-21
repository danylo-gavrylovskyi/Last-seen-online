import { Request, Response } from "express";
import { LastSeenUser } from "../types/lastSeenUser.interface";
import { transformUser } from "../utils/transformer";
import { users } from "../app";

interface TotalOnlineTimeRes {
	totalTime: number | null;
}

export const getTotalOnlineTime = async (req: Request, res: Response) => {
	const userId = req.query.userId as string;

	const fetchedUsers = users.getData();

	if (!fetchedUsers.find((user) => user.userId === userId)) {
		return res.status(404).json("Invalid userId is passed");
	}

	const result = getUserTotalOnlineTime(fetchedUsers, userId);

	return res.status(200).json(result);
};

export const getUserTotalOnlineTime = (
	data: LastSeenUser[],
	userId: string
): TotalOnlineTimeRes => {
	const userData = data.filter((entry) => entry.userId === userId);

	if (!userData.length) {
		return { totalTime: null };
	}

	const userTimeSpans = transformUser(userData);

	let totalTime: number = 0;
	userTimeSpans.forEach((timeSpan) => {
		if (timeSpan.login && timeSpan.logout) {
			totalTime += timeSpan.logout.getTime() - timeSpan.login.getTime();
		}
	});

	return { totalTime };
};
