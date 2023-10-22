import { getUserTotalOnlineTime } from "../../controllers/getTotalOnlineTime.controller";
import { LastSeenUser } from "../../types/lastSeenUser.interface";

describe("getUserTotalOnlineTime", () => {
	const mockUsers: LastSeenUser[] = [
		{
			userId: "user1",
			isOnline: true,
			lastSeenDate: new Date("2023-01-01T10:00:00Z"),
			nickname: "",
			lastName: "",
			firstName: "",
			registrationDate: new Date(),
		},
		{
			userId: "user1",
			isOnline: false,
			lastSeenDate: new Date("2023-01-01T12:00:00Z"),
			nickname: "",
			lastName: "",
			firstName: "",
			registrationDate: new Date(),
		},
		{
			userId: "user1",
			isOnline: true,
			lastSeenDate: new Date("2023-08-01T14:00:00Z"),
			nickname: "",
			lastName: "",
			firstName: "",
			registrationDate: new Date(),
		},
		{
			userId: "user1",
			isOnline: false,
			lastSeenDate: new Date("2023-08-01T15:00:00Z"),
			nickname: "",
			lastName: "",
			firstName: "",
			registrationDate: new Date(),
		},
	];

	it('should have res with "totalTime" field inside', () => {
		const res = getUserTotalOnlineTime(mockUsers, "1");
		expect(res).toHaveProperty("totalTime");
	});

	it('should return res where "totalTime" field is null when there is no data about user online time', () => {
		const res = getUserTotalOnlineTime([], "1");
		expect(res.totalTime).toBeNull();
	});

	it('should return a JSON response with a field named "totalTime" containing the total number of seconds that the user was online', () => {
		const expectedTotalTime = 3 * 3600;

		const res = getUserTotalOnlineTime(mockUsers, "user1");
		expect(res.totalTime).toBe(expectedTotalTime);
	});
});
