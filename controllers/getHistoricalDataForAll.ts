import { Request, Response } from 'express';
import { LastSeenUser } from '../types/lastSeenUser.interface';

interface UsersOnline {
  usersOnline: number | null;
}

export const getHistoricalDataForAll = async (req: Request, res: Response) => {
  const date = req.query.date as string;

  if (!date) {
    return res.status(400).json({ msg: 'Incorrect date' });
  }
  const count: UsersOnline = getOnlineUsersCountByDate(new Date(date));

  return res.status(200).json(count);
};

export const getOnlineUsersCountByDate = (users: LastSeenUser[], date: Date): UsersOnline => {};
