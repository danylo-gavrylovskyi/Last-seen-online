import express from "express";

import { getHistoricalDataForAll } from "./controllers/getHistoricalDataForAll.controller";
import { getHistoricalDataForUser } from "./controllers/getHistoricalDataForUser.controller";
import { predictOnlineUsersCount } from "./controllers/predictOnlineUsersCount.controller";
import { predictUserOnlineStatus } from "./controllers/predictUserOnlineStatus.controller";
import { getTotalOnlineTime } from "./controllers/getTotalOnlineTime.controller";
import { getDailyWeeklyTimeAverages } from "./controllers/getDailyWeeklyTimeAverages.controller";
import { main } from "./app";
import { forgetUser } from "./controllers/forgetUser";
import { createReport } from "./controllers/createReport";

const app = express();
app.use(express.json());
app.listen(3001, () => console.log("Server working"));

main();

app.get("/api/stats/users", getHistoricalDataForAll);

app.get("/api/stats/user", getHistoricalDataForUser);

app.get("/api/predictions/users", predictOnlineUsersCount);

app.get("/api/predictions/user", predictUserOnlineStatus);

app.get("/api/stats/user/total", getTotalOnlineTime);

app.get("/api/stats/user/average", getDailyWeeklyTimeAverages);

app.get("/api/user/forget", forgetUser);

app.post("/api/report/:reportName", createReport);

export const server = app;
