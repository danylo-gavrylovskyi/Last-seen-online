import { LastSeenUser } from '../types/lastSeenUser.interface';

interface TotalOnlineTimeRes {
  totalTime: number | null;
}

export const getTotalOnlineTime = () => {};

export const getUserTotalOnlineTime = (
  data: LastSeenUser[],
  userId: string,
): TotalOnlineTimeRes => {};
