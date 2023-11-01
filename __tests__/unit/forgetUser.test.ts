import { deleteDataAboutUser } from "../../controllers/forgetUser.controller";
import { LastSeenUser } from "../../types/lastSeenUser.interface";

describe("forgetUser", () => {
	let mockUsers: LastSeenUser[];
	let bannedUsers: string[];

	beforeEach(() => {
		mockUsers = [
			{
				userId: "1",
				nickname: "user1",
				firstName: "first",
				lastName: "user",
				registrationDate: new Date("01.01.2020"),
				lastSeenDate: new Date("05.10.2023"),
				isOnline: false,
			},
			{
				userId: "2",
				nickname: "user2",
				firstName: "second",
				lastName: "user",
				registrationDate: new Date("01.01.1990"),
				lastSeenDate: new Date("02.09.2023"),
				isOnline: false,
			},
		];

		bannedUsers = [];
	});

	it('should return res with "userId" field inside', () => {
		const res = deleteDataAboutUser(mockUsers, "1", bannedUsers);
		expect(res.res).toHaveProperty("userId");
	});

	it('should return res with "userId" field with value null if user with given userId doesnt exist', () => {
		const res = deleteDataAboutUser(mockUsers, "3", bannedUsers);
		expect(res.res.userId).toBe(null);
	});

	it('should return res with "userId" field with value null if user already in ban list', () => {
		bannedUsers.push("1");
		const res = deleteDataAboutUser(mockUsers, "1", bannedUsers);
		expect(res.res.userId).toBe(null);
	});

	it("should delete all data which is relevant to given user", () => {
		const res = deleteDataAboutUser(mockUsers, "1", bannedUsers);

		if (res.users) mockUsers = res.users;

		const userData = mockUsers.filter((user) => user.userId === "1");
		expect(userData.length).toBeFalsy();
	});

	it("should add given userId to banned users list", () => {
		deleteDataAboutUser(mockUsers, "1", bannedUsers);
		expect(bannedUsers).toContain("1");
	});
});
