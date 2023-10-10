import { calculateUserOnlineChance } from '../controllers/predictUserOnlineStatus.controller';
import { LastSeenUser } from '../types/lastSeenUser.interface';

describe('calculateUserOnlineChance', () => {
  const mockUsers: LastSeenUser[] = [
    {
      userId: '4',
      nickname: 'user2',
      firstName: 'second',
      lastName: 'user',
      registrationDate: new Date('01.01.1990'),
      lastSeenDate: new Date('2023-09-06T15:30:00'),
      isOnline: false,
    },
    {
      userId: '4',
      nickname: 'user2',
      firstName: 'second',
      lastName: 'user',
      registrationDate: new Date('01.01.1990'),
      lastSeenDate: new Date('2023-08-02T15:30:00'),
      isOnline: false,
    },
    {
      userId: '4',
      nickname: 'user2',
      firstName: 'second',
      lastName: 'user',
      registrationDate: new Date('01.01.1990'),
      lastSeenDate: new Date('2023-10-05T15:30:00'),
      isOnline: false,
    },
  ];

  it('should return an object with the "willBeOnline" and "onlineChance" fields', () => {
    const res = calculateUserOnlineChance(mockUsers, '4', new Date('2025-10-09T15:30:00'), 0.85);
    expect(res).toHaveProperty('willBeOnline');
    expect(res).toHaveProperty('onlineChance');
  });

  it('should return res where willBeOnline is true if the onlineChance is higher than the specified tolerance', () => {
    const res = calculateUserOnlineChance(mockUsers, '4', new Date('2025-10-09T15:30:00'), 0.0);
    expect(res.willBeOnline).toBe(true);
  });

  it('should return res where willBeOnline is false if the onlineChance is lower than the specified tolerance', () => {
    const res = calculateUserOnlineChance(mockUsers, '4', new Date('2025-10-09T15:30:00'), 0.99);
    expect(res.willBeOnline).toBe(false);
  });

  it('should return res where willBeOnline and onlineChance are null if the system has no historical data for the user', () => {
    const res = calculateUserOnlineChance([], '4', new Date('2025-10-09T15:30:00'), 0.85);
    expect(res.onlineChance).toBeNull();
    expect(res.willBeOnline).toBeNull();
  });

  it('should return res where onlineChance field represents the calculated chance that the user will be online on the specified date based on historical data.', () => {
    const res = calculateUserOnlineChance(mockUsers, '4', new Date('2025-10-09T15:30:00'), 0.85);
    const chance = 1 / 3;
    expect(res.onlineChance).toBe(chance);
  });
});
