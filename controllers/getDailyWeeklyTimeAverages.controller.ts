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

export const calculateAverages = (users: LastSeenUser[], userId: string): Averages => {
  const userOnlineData = users.filter((entry) => entry.userId === userId);

  if (!userOnlineData.length) {
    return { weeklyAverage: null, dailyAverage: null };
  }

  let dailyOnlineTime = 0;
  let weeklyOnlineTime = 0;
  let dailyOnlineTimePerDay = 0;
  let daysInWeek = 0;

  let previousDate = null;

  for (const entry of userOnlineData) {
    if (entry.isOnline && entry.lastSeenDate) {
      const currentDate = new Date(entry.lastSeenDate);

      if (previousDate) {
        const timeDifference = currentDate.getTime() - previousDate.getTime();
        dailyOnlineTimePerDay += timeDifference;
        weeklyOnlineTime += timeDifference;

        if (currentDate.getDay() !== previousDate.getDay()) {
          dailyOnlineTime += dailyOnlineTimePerDay;
          dailyOnlineTimePerDay = 0;
          daysInWeek += 1;
        }
      }

      previousDate = currentDate;
    }
  }

  const numberOfDays = daysInWeek > 0 ? daysInWeek : 1;
  const dailyAverage = dailyOnlineTime / numberOfDays / 1000;
  const weeklyAverage = weeklyOnlineTime / (numberOfDays / 7) / 1000;

  return { weeklyAverage, dailyAverage };
};
