import { Request, Response } from 'express';

interface WasUserOnline {
  wasUserOnline: boolean | null;
  nearestOnlineTime: Date | null;
}

export const getHistoricalDataForUser = async (req: Request, res: Response) => {};

export const getOnlineUserData = (userId: string, date: Date): WasUserOnline => {};
