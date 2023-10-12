import { getOnlineUserData } from '../../controllers/getHistoricalDataForUser.controller';

import { LastSeenUser } from '../../types/lastSeenUser.interface';

describe('getOnlineUsersCountByDate', () => {
  const mockUsers: LastSeenUser[] = [
    {
      userId: '1',
      nickname: 'user1',
      firstName: 'first',
      lastName: 'user',
      registrationDate: new Date('01.01.2020'),
      lastSeenDate: null,
      isOnline: true,
    },
    {
      userId: '2',
      nickname: 'user2',
      firstName: 'second',
      lastName: 'user',
      registrationDate: new Date('01.01.1990'),
      lastSeenDate: new Date('02.09.2023'),
      isOnline: false,
    },
    {
      userId: '3',
      nickname: 'user2',
      firstName: 'second',
      lastName: 'user',
      registrationDate: new Date('01.01.1990'),
      lastSeenDate: new Date('01.09.2023'),
      isOnline: false,
    },
    {
      userId: '3',
      nickname: 'user2',
      firstName: 'second',
      lastName: 'user',
      registrationDate: new Date('01.01.1990'),
      lastSeenDate: new Date('05.09.2023'),
      isOnline: false,
    },
  ];

  it('should return an object with 2 fields: wasUserOnline and nearestOnlineTime', () => {
    const res = getOnlineUserData(mockUsers, '1', new Date('02.09.2023'));
    expect(res).toHaveProperty('wasUserOnline');
    expect(res).toHaveProperty('nearestOnlineTime');
  });

  it('should return res where wasUserOnline is true if user was online at the requested time', () => {
    const res = getOnlineUserData(mockUsers, '2', new Date('02.09.2023'));
    expect(res.wasUserOnline).toBe(true);
  });

  it('should return res where wasUserOnline is false if user was offline at the requested time', () => {
    const res = getOnlineUserData(mockUsers, '1', new Date('02.09.2023'));
    expect(res.wasUserOnline).toBe(false);
  });

  it("should return res where wasUserOnline field is null if the system has no data if user was or wasn't online at that time", () => {
    const res = getOnlineUserData([], '1', new Date('02.09.2023'));
    expect(res.wasUserOnline).toBeNull();
  });

  it('should return res where if wasUserOnline is true than nearestOnlineTime is always null', () => {
    const res = getOnlineUserData(mockUsers, '2', new Date('02.09.2023'));
    expect(res.wasUserOnline).toBe(true);
    expect(res.nearestOnlineTime).toBeNull();
  });

  it('should return res where wasUserOnline and nearestOnlineTime are null if system has not found any online timespans for this user', () => {
    const res = getOnlineUserData(mockUsers, '10', new Date('02.09.2023'));
    expect(res.wasUserOnline).toBeNull();
    expect(res.nearestOnlineTime).toBeNull();
  });

  it('should return res where nearestOnlineTime is a field where the clothest time when user was online is specified', () => {
    const res = getOnlineUserData(mockUsers, '3', new Date('02.09.2023'));
    expect(res.nearestOnlineTime).toStrictEqual(new Date('01.09.2023'));
  });
});
