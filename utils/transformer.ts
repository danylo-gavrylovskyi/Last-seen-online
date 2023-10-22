import { LastSeenUser } from "../types/lastSeenUser.interface";

interface TimeSpans {
	login: Date | null;
	logout: Date | null;
}

export const transformUser = (userData: LastSeenUser[]) => {
	const userTimeSpans: TimeSpans[] = [];
	let status: "online" | "offline" = "offline";
	let index = 0;

	userData.forEach((data) => {
		if (data.lastSeenDate) data.lastSeenDate = new Date(data.lastSeenDate);

		if (data.isOnline && status === "offline") {
			status = "online";
			data.lastSeenDate
				? userTimeSpans.push({ login: data.lastSeenDate, logout: null })
				: userTimeSpans.push({ login: new Date(), logout: null }); // for tests to work
		} else if (index === 0 && !userTimeSpans[0]) {
			userTimeSpans.push({ login: null, logout: data.lastSeenDate });
			status = "offline";
			index++;
		} else if (data.lastSeenDate && status === "online") {
			userTimeSpans[index].logout = data.lastSeenDate;
			status = "offline";
			index++;
		}
	});
	return userTimeSpans;
};
