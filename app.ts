import { LastSeenUserResult } from "./types/lastSeenUserResult.interface";

const fetchUsersData = async (offset: number): Promise<LastSeenUserResult> => {
	const data: LastSeenUserResult = await fetch(
		`https://sef.podkolzin.consulting/api/users/lastSeen?offset=${offset}`,
		{
			mode: "cors",
		}
	).then((res) => res.json());

	return data;
};

async function main(): Promise<number> {
	return 0;
}

main();
