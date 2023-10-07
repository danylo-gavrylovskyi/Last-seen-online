import { Request, Response } from 'express';
import { LastSeenUser } from '../types/lastSeenUser.interface';
import { fetchAllUsers } from '../services/user.service';
import { LastSeenUserResult } from '../types/lastSeenUserResult.interface';
import { Users } from '../entities/users.class';

interface UsersOnline {
  usersOnline: number | null;
}

export const getHistoricalDataForAll = async (req: Request, res: Response) => {
  const date = req.query.date as string;

  const response: LastSeenUserResult = await fetchAllUsers();
  const users: LastSeenUser[] = new Users(response).getData();

  if (!date) {
    return res.status(400).json({ msg: 'Incorrect date' });
  }

  const count: UsersOnline = getOnlineUsersCountByDate(users, new Date(date));

  return res.status(200).json(count);
};

export const getOnlineUsersCountByDate = (users: LastSeenUser[], date: Date): UsersOnline => {
  const count = users.filter((user) => {
    if (!user.lastSeenDate) return false;
    const userDate = new Date(user.lastSeenDate);
    return userDate.toLocaleString() === date.toLocaleString();
  }).length;

  if (!count)
    return {
      usersOnline: null,
    };

  return {
    usersOnline: count,
  };
};
