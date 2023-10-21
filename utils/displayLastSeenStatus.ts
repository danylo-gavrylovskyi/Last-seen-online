import { getLastSeenDate } from "./getLastSeenDate";

import { LastSeenUser } from "../types/lastSeenUser.interface";

import * as localization from "../localization";

interface DisplayLastSeenStatusProps extends LastSeenUser {
	selectedLanguage: "en" | "ua";
}

export const displayLastSeenStatus = ({
	isOnline,
	nickname,
	lastSeenDate,
	selectedLanguage,
}: DisplayLastSeenStatusProps) => {
	if (isOnline || !lastSeenDate) {
		return `${nickname} ${localization[selectedLanguage].isOnline}`;
	}

	const date = new Date(lastSeenDate);

	return `${nickname} ${localization[selectedLanguage].wasOnline} ${getLastSeenDate(
		date,
		selectedLanguage
	)}`;
};
