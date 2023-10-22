import { Request, Response } from "express";
import { LastSeenUser } from "../types/lastSeenUser.interface";
import { transformUser } from "../utils/transformer";
import { users } from "../app";
import { getWeekNumber } from "./predictUserOnlineStatus.controller";

interface ForgottenUser {
	userId: string | null;
}

export const forgetUser = async (req: Request, res: Response) => {};

export const deleteDataAboutUser = (users: LastSeenUser[], userId: string): ForgottenUser => {};
