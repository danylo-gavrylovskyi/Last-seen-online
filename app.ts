import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { Users } from "./entities/users.class";

import { fetchAllUsers } from "./services/user.service";

import { displayLastSeenStatus } from "./utils/displayLastSeenStatus";

import * as localization from "./localization";

import { LastSeenUserResult } from "./types/lastSeenUserResult.interface";
import { UserReport } from "./types/report.interface";

export let users = new Users({} as LastSeenUserResult);
export let bannedUsers: string[] = [];
export let reports: UserReport[] = [];

export async function main(): Promise<number> {
	// const rl = readline.createInterface({ input, output });
	// const selectedLanguage = (await rl.question("Choose language (en / ua): ")) as "en" | "ua";

	const selectedLanguage = "en"; // e2e fix
	const lang = localization[selectedLanguage];

	try {
		const response: LastSeenUserResult = await fetchAllUsers();
		users = new Users(response);

		setInterval(async () => {
			console.log("Loading data");
			const response: LastSeenUserResult = await fetchAllUsers();
			users.addData(response.data);
			console.log("Data loaded");
		}, 5000);

		users.getData().forEach((user) => {
			const { firstName, lastName, registrationDate, lastSeenDate, userId } = user;

			console.log(
				`${lang.user} ${userId}:\n${displayLastSeenStatus({
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
