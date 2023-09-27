import { getLastSeenDate } from "./getLastSeenDate";

import { LastSeenUser } from "../types/lastSeenUser.interface";

export const displayLastSeenStatus = ({ isOnline, nickname, lastSeenDate }: LastSeenUser) => {
	if (isOnline) {
		return `${nickname} is online`;
	}

	const date = new Date(lastSeenDate);

	return `${nickname} was online ${getLastSeenDate(date)}`;
};
