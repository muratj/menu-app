/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { itemsRouter } from './items/items.router';

dotenv.config();

/**
 * App Variables
 */

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/menu/items', itemsRouter);

/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
