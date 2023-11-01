import { Request, Response } from "express";
import { LastSeenUser } from "../types/lastSeenUser.interface";
import { bannedUsers, users } from "../app";

interface ForgottenUserRes {
	userId: string | null;
}

interface ForgottenUser {
	res: ForgottenUserRes;
	users: LastSeenUser[];
}

export const forgetUser = async (req: Request, res: Response) => {
	const userId = req.query.userId as string;

	const usersData = users.getData();

	const forgottenUser = deleteDataAboutUser(usersData, userId, bannedUsers);

	forgottenUser.users && users.setData(forgottenUser.users);

	return res.status(200).json(forgottenUser.res);
};

export const deleteDataAboutUser = (
	users: LastSeenUser[],
	userId: string,
	bannedUsers: string[]
): ForgottenUser => {
	const userData = users.filter((entry) => entry.userId === userId);

	if (!userData.length || bannedUsers.includes(userId)) {
		return { res: { userId: null }, users: [] };
	}

	const newUsers = users.filter((entry) => entry.userId !== userId);
	bannedUsers.push(userId);

	const res = {
		userId,
	};

	return { res, users: newUsers };
};
