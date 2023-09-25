import { Users } from "./entities/users.class";

import { fetchUsersData } from "./services/user.service";
import { LastSeenUserResult } from "./types/lastSeenUserResult.interface";

async function main(): Promise<number> {
	try {
		const response: LastSeenUserResult = await fetchUsersData(20);
		const users = new Users(response);

		return 0;
	} catch (error) {
		console.log(`Error fetching user data: ${error}`);
		return 1;
	}
}

main();
