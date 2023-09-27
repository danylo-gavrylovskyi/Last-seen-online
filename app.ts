import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { Users } from "./entities/users.class";

import { fetchUsersData } from "./services/user.service";

import { displayLastSeenStatus } from "./utils/displayLastSeenStatus";

import * as localization from "./localization";

import { LastSeenUserResult } from "./types/lastSeenUserResult.interface";

async function main(): Promise<number> {
	const rl = readline.createInterface({ input, output });
	const selectedLanguage = (await rl.question("Choose language (en / ua): ")) as "en" | "ua";

	const lang = localization[selectedLanguage];

	try {
		const response: LastSeenUserResult = await fetchUsersData(20);
		const users = new Users(response);

		users.getData().forEach((user, index) => {
			const { firstName, lastName, registrationDate, lastSeenDate } = user;

			console.log(
				`${lang.user} ${index}:\n${displayLastSeenStatus({
					...user,
					selectedLanguage,
				})}\n${lang.firstName} - ${firstName}\n${lang.lastName} - ${lastName}\n${
					lang.registrationDate
				} - ${registrationDate ? new Date(registrationDate) : registrationDate}\n${
					lang.lastSeenDate
				} - ${lastSeenDate ? new Date(lastSeenDate) : lastSeenDate}\n`
			);
		});

		return 0;
	} catch (error) {
		console.log(`Error fetching user data: ${error}`);
		return 1;
	}
}

main();
