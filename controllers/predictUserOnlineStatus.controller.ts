import { Request, Response } from 'express';

import { fetchAllUsers } from '../services/user.service';

import { Users } from '../entities/users.class';

import { LastSeenUser } from '../types/lastSeenUser.interface';
import { LastSeenUserResult } from '../types/lastSeenUserResult.interface';

interface UserOnlineChance {
  willBeOnline: boolean | null;
  onlineChance: number | null;
}

export const predictUserOnlineStatus = async (req: Request, res: Response) => {
  const date = req.query.date as string;
  const userId = req.query.userId as string;
  const tolerance = Number(req.query.tolerance as string);

  const response: LastSeenUserResult = await fetchAllUsers();
  const users: LastSeenUser[] = new Users(response).getData();

  const result = calculateUserOnlineChance(users, userId, new Date(date), tolerance);

  return res.status(200).json(result);
};

export const calculateUserOnlineChance = (
  users: LastSeenUser[],
  userId: string,
  date: Date,
  tolerance: number,
): UserOnlineChance => {
  const userHistoricalData = users.filter((user) => user.userId === userId);

  if (!userHistoricalData.length) return { willBeOnline: null, onlineChance: null };

  const wasOnlineAtThisWeekdayAtThisTime = userHistoricalData.filter(
    (user) =>
      user.lastSeenDate?.getDay() === date.getDay() &&
      user.lastSeenDate?.getHours() === date.getHours(),
  );

  const uniqueWeeks = [
    ...new Set(
      userHistoricalData.map((user) => user.lastSeenDate && getWeekNumber(user.lastSeenDate)),
    ),
  ];

  console.log(wasOnlineAtThisWeekdayAtThisTime, uniqueWeeks);

  const chance = wasOnlineAtThisWeekdayAtThisTime.length / uniqueWeeks.length;

  const willBeOnline = chance > tolerance;

  return {
    willBeOnline,
    onlineChance: chance,
  };
};

const getWeekNumber = (date: Date): string => {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = String(Math.ceil((days + 1) / 7)).padStart(2, '0');
  return `${year}-${weekNumber}`;
};
