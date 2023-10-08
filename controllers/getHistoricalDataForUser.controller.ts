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
): WasUserOnline => {
  const userTimespans = users
    .filter((user) => user.userId === userId)
    .map((user) => String(user.lastSeenDate));

  if (!userTimespans.length) {
    return {
      wasUserOnline: null,
      nearestOnlineTime: null,
    };
  }

  if (userTimespans.includes(String(date))) {
    return {
      wasUserOnline: true,
      nearestOnlineTime: null,
    };
  }

  return {
    wasUserOnline: false,
    nearestOnlineTime: null,
  };
};
