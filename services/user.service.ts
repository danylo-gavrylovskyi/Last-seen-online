import { LastSeenUserResult } from "../types/lastSeenUserResult.interface";

export const fetchUsersData = async (offset: number): Promise<LastSeenUserResult> => {
	const data: LastSeenUserResult = await fetch(
		`https://sef.podkolzin.consulting/api/users/lastSeen?offset=${offset}`,
		{
			mode: "cors",
		}
	).then((res) => res.json());

	return data;
};
