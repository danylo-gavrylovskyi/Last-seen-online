import express from 'express';
import { getHistoricalDataForAll } from './controllers/getHistoricalDataForAll';

const app = express();
app.use(express.json());
app.listen(3001, () => console.log('Server working'));

app.get('/api/stats/users', getHistoricalDataForAll);
