import { Request, Response } from 'express';
import { LastSeenUser } from '../types/lastSeenUser.interface';
import { fetchAllUsers } from '../services/user.service';
import { LastSeenUserResult } from '../types/lastSeenUserResult.interface';
import { Users } from '../entities/users.class';

interface Averages {
  weeklyAverage: number | null;
  dailyAverage: number | null;
}

export const getDailyWeeklyTimeAverages = async (req: Request, res: Response) => {
  const date = req.query.date as string;

  const response: LastSeenUserResult = await fetchAllUsers();
  const users: LastSeenUser[] = new Users(response).getData();

  if (!date) {
    return res.status(400).json({ msg: 'Incorrect date' });
  }

  return res.status(200).json(res);
};
