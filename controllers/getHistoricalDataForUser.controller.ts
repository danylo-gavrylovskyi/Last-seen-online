import { Request, Response } from 'express';
import { LastSeenUser } from '../types/lastSeenUser.interface';

interface WasUserOnline {
  wasUserOnline: boolean | null;
  nearestOnlineTime: Date | null;
}

export const getHistoricalDataForUser = async (req: Request, res: Response) => {};

export const getOnlineUserData = (
  users: LastSeenUser[],
  userId: string,
  date: Date,
): WasUserOnline => {};
