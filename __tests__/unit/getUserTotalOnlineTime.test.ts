import { getUserTotalOnlineTime } from '../../controllers/getTotalOnlineTime.controller';
import { LastSeenUser } from '../../types/lastSeenUser.interface';

describe('getUserTotalOnlineTime', () => {
  const mockUsers: LastSeenUser[] = [
    {
      userId: 'user1',
      isOnline: true,
      lastSeenDate: new Date('2023-01-01T10:00:00'),
      nickname: '',
      lastName: '',
      firstName: '',
      registrationDate: new Date(),
    },
    {
      userId: 'user1',
      isOnline: false,
      lastSeenDate: new Date('2023-01-01T12:00:00'),
      nickname: '',
      lastName: '',
      firstName: '',
      registrationDate: new Date(),
    },
    {
      userId: 'user1',
      isOnline: true,
      lastSeenDate: new Date('2023-01-01T14:00:00'),
      nickname: '',
      lastName: '',
      firstName: '',
      registrationDate: new Date(),
    },
  ];

  it('should have res with "totalTime" field inside', () => {
    const res = getUserTotalOnlineTime(mockUsers, '1');
    expect(res).toHaveProperty('totalTime');
  });

  it('should return res where "totalTime" field is null when there is no data about user online time', () => {
    const res = getUserTotalOnlineTime([], '1');
    expect(res.totalTime).toBeNull();
  });

  it('should return a JSON response with a field named "totalTime" containing the total number of seconds that the user was online', () => {
    if (!mockUsers[0].lastSeenDate || !mockUsers[2].lastSeenDate) return undefined;
    const startTime = new Date(mockUsers[0].lastSeenDate);
    const endTime = new Date(mockUsers[2].lastSeenDate);
    const expectedTotalTime = (endTime.getDate() - startTime.getDate()) / 1000;

    const res = getUserTotalOnlineTime(mockUsers, 'user1');
    expect(res.totalTime).toBe(expectedTotalTime);
  });
});
