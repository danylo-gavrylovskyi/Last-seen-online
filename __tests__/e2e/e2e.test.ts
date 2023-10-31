import { server } from "../../index";
import supertest from "supertest";
const requestWithSupertest = supertest(server);

const USER_ID = "61fbd1a7-2358-9782-7f2f-25a0b8d0fc37";

describe("e2e tests", () => {
	beforeEach(() => {
		setTimeout(() => {}, 1500);
	});

	it("/api/stats/users", async () => {
		const response = await requestWithSupertest
			.get(`/api/stats/users?date=2023-08-01T15:00:00Z`)
			.expect("Content-Type", /json/)
			.expect(200);

		expect(response.body).toHaveProperty("usersOnline");
	});

	it("/api/stats/user", async () => {
		const response = await requestWithSupertest
			.get(`/api/stats/user?date=2023-08-01T15:00:00Z&userId=${USER_ID}`)
			.expect("Content-Type", /json/)
			.expect(200);

		expect(response.body).toHaveProperty("wasUserOnline");
		expect(response.body).toHaveProperty("nearestOnlineTime");
	});

	it("/api/predictions/users", async () => {
		const response = await requestWithSupertest
			.get(`/api/predictions/users?date=2023-08-01T15:00:00Z`)
			.expect("Content-Type", /json/)
			.expect(200);

		expect(response.body).toHaveProperty("onlineUsers");
	});

	it("/api/predictions/user", async () => {
		const response = await requestWithSupertest
			.get(`/api/predictions/user?date=2023-08-01T15:00:00Z&userId=${USER_ID}`)
			.expect("Content-Type", /json/)
			.expect(200);

		expect(response.body).toHaveProperty("willBeOnline");
		expect(response.body).toHaveProperty("onlineChance");
	});

	it("/api/stats/user/total", async () => {
		const response = await requestWithSupertest
			.get(`/api/stats/user/total?userId=${USER_ID}`)
			.expect("Content-Type", /json/)
			.expect(200);

		expect(response.body).toHaveProperty("totalTime");
	});

	it("/api/stats/user/average", async () => {
		const response = await requestWithSupertest
			.get(`/api/stats/user/average?userId=${USER_ID}`)
			.expect("Content-Type", /json/)
			.expect(200);

		expect(response.body).toHaveProperty("weeklyAverage");
		expect(response.body).toHaveProperty("dailyAverage");
	});

	it("/api/user/forget", async () => {
		const response = await requestWithSupertest
			.get(`/api/user/forget?userId=${USER_ID}`)
			.expect("Content-Type", /json/)
			.expect(200);

		expect(response.body).toHaveProperty("userId");
	});
});
