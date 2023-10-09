import { predictNumberOfUsers } from '../controllers/predictOnlineUsersCount.controller';

import { LastSeenUser } from '../types/lastSeenUser.interface';

describe('predictNumberOfUsers', () => {
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
      userId: '4',
      nickname: 'user4',
      firstName: 'fourth',
      lastName: 'user',
      registrationDate: new Date('01.01.1990'),
      lastSeenDate: new Date('02.09.2023'),
      isOnline: false,
    },
  ];

  it('should return an object with the "onlineUsers" field', () => {
    const res = predictNumberOfUsers(mockUsers, new Date('2025-09-27T20:00:00'));
    expect(res).toHaveProperty('onlineUsers');
  });

  it('should return "onlineUsers" as an integer or null', () => {
    const res = predictNumberOfUsers(mockUsers, new Date('2025-09-27T20:00:00'));
    const isIntegerOrNull = Number.isInteger(res.onlineUsers) || res.onlineUsers === null;
    expect(isIntegerOrNull).toBe(true);
  });

  it('should return the predicted number of online users for a specified date in the future', () => {
    const res = predictNumberOfUsers(mockUsers, new Date('2025-09-02T20:00:00'));
    expect(res.onlineUsers).toBe(2);
  });
});
