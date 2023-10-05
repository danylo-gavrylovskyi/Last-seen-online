import { LastSeenUser } from "../types/lastSeenUser.interface";
import { LastSeenUserResult } from "../types/lastSeenUserResult.interface";

const fetchUsersData = async (offset: number): Promise<LastSeenUserResult> => {
	const data: LastSeenUserResult = await fetch(
		`https://sef.podkolzin.consulting/api/users/lastSeen?offset=${offset}`,
		{
			mode: "cors",
		}
	).then((res) => res.json());

	return data;
};

export const fetchAllUsers = async (): Promise<LastSeenUserResult> => {
	let total: number = 0;
	const data: LastSeenUser[] = [];
	let offset: number = 0;

	while (true) {
		const response = await fetchUsersData(offset);

		if (total === 0) {
			total = response.total;
		}

		if (!response.data.length) {
			break;
		}

		data.push(...response.data);

		offset += data.length;
	}
	return { total, data };
};
