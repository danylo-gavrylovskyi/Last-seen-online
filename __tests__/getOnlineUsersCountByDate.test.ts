import { getOnlineUsersCountByDate } from '../controllers/getHistoricalDataForAll.controller';
import { LastSeenUser } from '../types/lastSeenUser.interface';

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
  ];

  it('should return an object with a single field: usersOnline', () => {
    const res = getOnlineUsersCountByDate(mockUsers, new Date('02.09.2023'));
    expect(res).toHaveProperty('usersOnline');
  });

  it('should return integer value', () => {
    const res = getOnlineUsersCountByDate(mockUsers, new Date('02.09.2023'));
    expect(typeof res.usersOnline).toBe('number');
  });

  it('should return null', () => {
    const res = getOnlineUsersCountByDate(mockUsers, new Date('invalid-date'));
    expect(res.usersOnline).toBeNull();
  });

  it('should return res where usersOnline is null if system has no data about amount of users at that time', () => {
    const res = getOnlineUsersCountByDate([], new Date('02.09.2023'));
    expect(res.usersOnline).toBeNull();
  });

  it('should return res where usersOnline is an integer value that is equal to the number of users that were online at the requested date', () => {
    const res = getOnlineUsersCountByDate(mockUsers, new Date('02.09.2023'));
    expect(res.usersOnline).toBe(1);
  });
});
