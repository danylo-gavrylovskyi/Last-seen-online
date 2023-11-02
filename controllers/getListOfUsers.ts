import { Request, Response } from 'express';
import { users } from '../app';

interface UserData {
  username: string;
  userId: string;
  firstSeen: Date;
}

export const getListOfUsers = async (req: Request, res: Response) => {
  const usersData = users.getData();

  const result = getUserList();

  return res.status(200).json(result);
};

export const getUserList = (): UserData[] => {};
