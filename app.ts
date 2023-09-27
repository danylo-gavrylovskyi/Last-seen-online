import { Users } from "./entities/users.class";

import { fetchUsersData } from "./services/user.service";

import { displayLastSeenStatus } from "./utils/displayLastSeenStatus";

import { LastSeenUserResult } from "./types/lastSeenUserResult.interface";

async function main(): Promise<number> {
	try {
		const response: LastSeenUserResult = await fetchUsersData(20);
		const users = new Users(response);

		users.getData().forEach((user, index) => {
			const { firstName, lastName, registrationDate, lastSeenDate } = user;

			console.log(
				`User ${index}:\n${displayLastSeenStatus(
					user
				)}\nFirst name - ${firstName}\nLast name - ${lastName}\nRegistration date - ${
					registrationDate ? new Date(registrationDate) : registrationDate
				}\nLast seen date - ${lastSeenDate ? new Date(lastSeenDate) : lastSeenDate}\n`
			);
		});

		return 0;
	} catch (error) {
		console.log(`Error fetching user data: ${error}`);
		return 1;
	}
}

main();
