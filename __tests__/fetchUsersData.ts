import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { fetchUsersData } from "../services/user.service";

describe("fetchUsersData", () => {
	it("fetches user data with the provided offset", async () => {
		const offset = 42;
		const mockResponse = {
			total: 2,
			data: [
				{
					userId: "1",
					nickname: "user1",
					firstName: "first",
					lastName: "user",
					registrationDate: String(new Date("01.01.2020")),
					lastSeenDate: String(new Date("05.10.2023")),
					isOnline: false,
				},
				{
					userId: "2",
					nickname: "user2",
					firstName: "second",
					lastName: "user",
					registrationDate: String(new Date("01.01.1990")),
					lastSeenDate: String(new Date("02.09.2023")),
					isOnline: false,
				},
			],
		};

		const mock = new MockAdapter(axios);

		mock
			.onGet(`https://sef.podkolzin.consulting/api/users/lastSeen?offset=${offset}`)
			.reply(200, mockResponse);

		const result = await fetchUsersData(offset);

		expect(mock.history.get[0].url).toBe(
			`https://sef.podkolzin.consulting/api/users/lastSeen?offset=${offset}`
		);

		expect(result).toEqual(mockResponse);

		mock.restore();
	});
});
