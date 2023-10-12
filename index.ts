import express from 'express';

import { getHistoricalDataForAll } from './controllers/getHistoricalDataForAll.controller';
import { getHistoricalDataForUser } from './controllers/getHistoricalDataForUser.controller';
import { predictOnlineUsersCount } from './controllers/predictOnlineUsersCount.controller';
import { predictUserOnlineStatus } from './controllers/predictUserOnlineStatus.controller';
import { getTotalOnlineTime } from './controllers/getTotalOnlineTime.controller';
import { getDailyWeeklyTimeAverages } from './controllers/getDailyWeeklyTimeAverages.controller';

const app = express();
app.use(express.json());
app.listen(3001, () => console.log('Server working'));

app.get('/api/stats/users', getHistoricalDataForAll);

app.get('/api/stats/user', getHistoricalDataForUser);

app.get('/api/predictions/users', predictOnlineUsersCount);

app.get('/api/predictions/user', predictUserOnlineStatus);

app.get('/api/stats/user/total', getTotalOnlineTime);

app.get('/api/stats/user/average', getDailyWeeklyTimeAverages);
