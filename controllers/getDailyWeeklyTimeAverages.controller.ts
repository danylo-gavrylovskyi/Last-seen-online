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
  const userId = req.query.userId as string;

  const response: LastSeenUserResult = await fetchAllUsers();
  const users: LastSeenUser[] = new Users(response).getData();

  const averages = calculateAverages(users, userId);

  return res.status(200).json(averages);
};

export const calculateAverages = (users: LastSeenUser[], userId: string): Averages => {};
