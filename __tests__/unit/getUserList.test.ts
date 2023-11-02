import { getUserList } from '../../controllers/getListOfUsers';
import { LastSeenUser } from '../../types/lastSeenUser.interface';

describe('getUserList', () => {
  const mockUsers: LastSeenUser[] = [
    {
      userId: 'user1',
      isOnline: true,
      lastSeenDate: new Date('2023-01-01T10:00:00Z'),
      nickname: '',
      lastName: '',
      firstName: '',
      registrationDate: new Date(),
    },
    {
      userId: 'user1',
      isOnline: false,
      lastSeenDate: new Date('2023-01-01T12:00:00Z'),
      nickname: '',
      lastName: '',
      firstName: '',
      registrationDate: new Date(),
    },
    {
      userId: 'user2',
      isOnline: true,
      lastSeenDate: new Date('2023-08-01T14:00:00Z'),
      nickname: '',
      lastName: '',
      firstName: '',
      registrationDate: new Date(),
    },
    {
      userId: 'user2',
      isOnline: false,
      lastSeenDate: new Date('2023-08-01T15:00:00Z'),
      nickname: '',
      lastName: '',
      firstName: '',
      registrationDate: new Date(),
    },
  ];

  it('should have res with data of two users inside', () => {
    const res = getUserList(mockUsers);
    expect(res.length).toBe(2);
  });

  it('should have empty res when there is not user data', () => {
    const res = getUserList([]);
    expect(res).toStrictEqual([]);
  });

  it('should return res with correct time of first seen', () => {
    const res = getUserList(mockUsers);
    expect(res[0].firstSeen).toStrictEqual(new Date('2023-01-01T10:00:00Z'));
  });
});
