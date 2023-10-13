import { Request, Response } from 'express';
import { LastSeenUserResult } from '../types/lastSeenUserResult.interface';
import { fetchAllUsers } from '../services/user.service';
import { Users } from '../entities/users.class';
import { LastSeenUser } from '../types/lastSeenUser.interface';

interface TotalOnlineTimeRes {
  totalTime: number | null;
}

export const getTotalOnlineTime = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  const response: LastSeenUserResult = await fetchAllUsers();
  const users: LastSeenUser[] = new Users(response).getData();

  if (!users.find((user) => user.userId === userId)) {
    return res.status(404).json('Invalid userId is passed');
  }

  const result = getUserTotalOnlineTime(users, userId);

  return res.status(200).json(result);
};

export const getUserTotalOnlineTime = (
  data: LastSeenUser[],
  userId: string,
): TotalOnlineTimeRes => {
  const userData = data.filter((entry) => entry.userId === userId);

  if (!userData.length) {
    return { totalTime: null };
  }

  let start_time = null;
  let total_duration = 0;

  for (const row of userData) {
    if (row.isOnline && start_time === null && row.lastSeenDate) {
      start_time = new Date(row.lastSeenDate);
    } else if (!row.isOnline && start_time !== null && row.lastSeenDate) {
      const end_time = new Date(row.lastSeenDate);
      const timeDifferenceInSeconds = (end_time.getDate() - start_time.getDate()) / 1000;
      total_duration += timeDifferenceInSeconds;
      start_time = null;
    }
  }

  return { totalTime: total_duration };
};
