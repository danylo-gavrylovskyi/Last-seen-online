import { Request, Response } from 'express';
import { LastSeenUser } from '../types/lastSeenUser.interface';
import { LastSeenUserResult } from '../types/lastSeenUserResult.interface';
import { fetchAllUsers } from '../services/user.service';
import { Users } from '../entities/users.class';

interface WasUserOnline {
  wasUserOnline: boolean | null;
  nearestOnlineTime: Date | null;
}

export const getHistoricalDataForUser = async (req: Request, res: Response) => {
  const date = req.query.date as string;
  const userId = req.query.userId as string;

  const response: LastSeenUserResult = await fetchAllUsers();
  const users: LastSeenUser[] = new Users(response).getData();

  if (!users.find((user) => user.userId === userId)) {
    return res.status(404).json('Invalid userId is passed');
  }

  const result = getOnlineUserData(users, userId, new Date(date));

  return res.status(200).json(result);
};

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

  const differenceInTime = userTimespans.map((timestamp) =>
    Math.abs(new Date(timestamp).getTime() - date.getTime()),
  );

  const index = differenceInTime.indexOf(Math.min(...differenceInTime));

  const nearestTime = userTimespans[index];

  return {
    wasUserOnline: false,
    nearestOnlineTime: new Date(nearestTime),
  };
};
