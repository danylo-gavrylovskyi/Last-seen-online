import express from "express";
import { Request, Response } from "express";

import { main, users } from "./app";

import { getHistoricalDataForAll } from "./controllers/getHistoricalDataForAll.controller";
import { getHistoricalDataForUser } from "./controllers/getHistoricalDataForUser.controller";
import { predictOnlineUsersCount } from "./controllers/predictOnlineUsersCount.controller";
import { predictUserOnlineStatus } from "./controllers/predictUserOnlineStatus.controller";
import { getTotalOnlineTime } from "./controllers/getTotalOnlineTime.controller";
import { getDailyWeeklyTimeAverages } from "./controllers/getDailyWeeklyTimeAverages.controller";
import { forgetUser } from "./controllers/forgetUser.controller";
import { createReport } from "./controllers/createReport.controller";
import { getReport } from "./controllers/getReport";
import { getAllReports } from "./controllers/getAllReports.controller";

import { displayLastSeenStatus } from "./utils/displayLastSeenStatus";

import * as localization from "./localization";

const app = express();
app.use(express.json());
export const server = app.listen(3001);

main();

app.get("/api/formatted", (req: Request, res: Response) => {
	const selectedLanguage = "en";
	const lang = localization[selectedLanguage];
	let response: string[] = [];
	users.getData().forEach((user) => {
		const { firstName, lastName, registrationDate, lastSeenDate, userId } = user;

		response.push(
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
	return res.json(response);
});

app.get("/api/stats/users", getHistoricalDataForAll);

app.get("/api/stats/user", getHistoricalDataForUser);

app.get("/api/predictions/users", predictOnlineUsersCount);

app.get("/api/predictions/user", predictUserOnlineStatus);

app.get("/api/stats/user/total", getTotalOnlineTime);

app.get("/api/stats/user/average", getDailyWeeklyTimeAverages);

app.get("/api/user/forget", forgetUser);

app.post("/api/report/:reportName", createReport);
app.get("/api/report/:reportName", getReport);
app.get("/api/reports", getAllReports);
