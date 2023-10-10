import { Request, Response } from 'express';

import { fetchAllUsers } from '../services/user.service';

import { Users } from '../entities/users.class';

import { LastSeenUser } from '../types/lastSeenUser.interface';
import { LastSeenUserResult } from '../types/lastSeenUserResult.interface';

interface UserOnlineChance {
  willBeOnline: boolean | null;
  onlineChance: number | null;
}

export const predictUserOnlineStatus = async (req: Request, res: Response) => {};

export const calculateUserOnlineChance = (
  users: LastSeenUser[],
  userId: string,
  date: Date,
  tolerance: number,
): UserOnlineChance => {};
