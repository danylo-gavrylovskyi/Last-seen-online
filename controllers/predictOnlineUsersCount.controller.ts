import { Request, Response } from 'express';

import { fetchAllUsers } from '../services/user.service';

import { Users } from '../entities/users.class';

import { LastSeenUser } from '../types/lastSeenUser.interface';
import { LastSeenUserResult } from '../types/lastSeenUserResult.interface';

interface OnlineUsersPrediction {
  onlineUsers: number | null;
}

export const predictOnlineUsersCount = async (req: Request, res: Response) => {
  const date = req.query.date as string;

  const response: LastSeenUserResult = await fetchAllUsers();
  const users: LastSeenUser[] = new Users(response).getData();

  const result = predictNumberOfUsers(users, new Date(date));

  return res.status(200).json(result);
};

export const predictNumberOfUsers = (users: LastSeenUser[], date: Date): OnlineUsersPrediction => {
  const dayAndTimeOccurrence: Date[] = [];

  for (const user of users) {
    if (
      !dayAndTimeOccurrence.some((occurr) => String(occurr) === String(user.lastSeenDate)) &&
      user.lastSeenDate?.getDay() === date.getDay() &&
      user.lastSeenDate.getHours() === date.getHours()
    ) {
      dayAndTimeOccurrence.push(user.lastSeenDate);
    }
  }

  const onlineUsersInGivenDate = users.filter((user) => {
    if (
      user.lastSeenDate?.getDay() === date.getDay() &&
      user.lastSeenDate.getHours() === date.getHours()
    ) {
      return user.lastSeenDate;
    }
  }).length;

  const average = Math.floor(onlineUsersInGivenDate / dayAndTimeOccurrence.length);

  if (!average)
    return {
      onlineUsers: null,
    };

  return {
    onlineUsers: average,
  };
};
