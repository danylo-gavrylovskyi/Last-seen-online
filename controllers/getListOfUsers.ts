import { Request, Response } from 'express';
import { users } from '../app';
import { LastSeenUser } from '../types/lastSeenUser.interface';
import { transformUser } from '../utils/transformer';

interface UserData {
  username: string;
  userId: string;
  firstSeen: Date | null;
}

export const getListOfUsers = async (req: Request, res: Response) => {
  const usersData = users.getData();

  const result = getUserList(usersData);

  return res.status(200).json(result);
};

export const getUserList = (users: LastSeenUser[]): UserData[] => {
  const listOfUsers: UserData[] = [];

  users.forEach((user) => {
    if (listOfUsers.find((userInList) => userInList.userId === user.userId)) return;

    const userData = users.filter((entry) => entry.userId === user.userId);
    const transformedUser = transformUser(userData);

    const firstSeen = transformedUser[0].login;

    listOfUsers.push({ username: user.nickname, userId: user.userId, firstSeen });
  });

  return listOfUsers;
};
