import { LastSeenUser } from '../types/lastSeenUser.interface';

interface TotalOnlineTimeRes {
  totalTime: number | null;
}

export const getTotalOnlineTime = () => {};

export const getUserTotalOnlineTime = (
  data: LastSeenUser[],
  userId: string,
): TotalOnlineTimeRes => {
  const userData = data.filter((entry) => entry.userId === userId);

  if (userData.length === 0) {
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
