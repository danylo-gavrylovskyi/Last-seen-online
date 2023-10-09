import express from 'express';

import { getHistoricalDataForAll } from './controllers/getHistoricalDataForAll.controller';
import { getHistoricalDataForUser } from './controllers/getHistoricalDataForUser.controller';
import { predictOnlineUsersCount } from './controllers/predictOnlineUsersCount.controller';

const app = express();
app.use(express.json());
app.listen(3001, () => console.log('Server working'));

app.get('/api/stats/users', getHistoricalDataForAll);

app.get('/api/stats/user', getHistoricalDataForUser);

app.get('/api/predictions/users', predictOnlineUsersCount);
