import express from 'express';

import { usersRouter } from './usersRoutes.js';
import { entriesRouter } from './entriesRoutes.js';

export const indexRouter = express.Router();

indexRouter.use(usersRouter,entriesRouter);