import axios from "axios";

import { LastSeenUser } from "../types/lastSeenUser.interface";
import { LastSeenUserResult } from "../types/lastSeenUserResult.interface";
import { bannedUsers } from "../app";

export const fetchUsersData = async (offset: number): Promise<LastSeenUserResult> => {
	const { data } = await axios.get(
		`https://sef.podkolzin.consulting/api/users/lastSeen?offset=${offset}`,
		{
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		}
	);

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

		response.data = response.data.filter((user) => !bannedUsers.includes(user.userId));
		data.push(...response.data);

		offset += data.length;
	}
	return { total, data };
};
