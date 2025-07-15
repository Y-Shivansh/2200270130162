import express from 'express';
import urlRoutes from './routes/urlRoutes.js';
import logger from '../Logging Middleware/logger.js'

const app = express();

app.use(express.json());
app.use(logger);
app.use('/', urlRoutes);

export default app;
