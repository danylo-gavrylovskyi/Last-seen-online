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
		console.log(data);
		if (data.isOnline && status === "offline") {
			status = "online";
			userTimeSpans.push({ login: new Date(), logout: null });
		} else if (index === 0 && data.lastSeenDate) {
			userTimeSpans.push({ login: null, logout: data.lastSeenDate });
			status = "offline";
			index++;
		} else if (data.lastSeenDate && status === "online") {
			userTimeSpans[index - 1].logout = data.lastSeenDate;
			status = "offline";
			index++;
		}
	});
	return userTimeSpans;
};
