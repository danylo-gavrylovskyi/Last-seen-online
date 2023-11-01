import { Users } from "./entities/users.class";

import { fetchAllUsers } from "./services/user.service";

import { LastSeenUserResult } from "./types/lastSeenUserResult.interface";
import { UserReport } from "./types/report.interface";

export let users = new Users({} as LastSeenUserResult);
export let bannedUsers: string[] = [];
export let reports: UserReport[] = [];

export async function main(): Promise<number> {
	try {
		const response: LastSeenUserResult = await fetchAllUsers();
		users = new Users(response);

		// setInterval(async () => {
		// 	const response: LastSeenUserResult = await fetchAllUsers();
		// 	users.addData(response.data);
		// }, 5000);  worker crashed the tests

		return 0;
	} catch (error) {
		console.log(`Error fetching user data: ${error}`);
		return 1;
	}
}
