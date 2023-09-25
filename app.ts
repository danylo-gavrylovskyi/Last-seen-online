import { Users } from "./entities/users.class";

import { fetchUsersData } from "./services/user.service";
import { LastSeenUserResult } from "./types/lastSeenUserResult.interface";

async function main(): Promise<number> {
	const response: LastSeenUserResult = await fetchUsersData(20);

	const users = new Users(response);

	return 0;
}

main();
