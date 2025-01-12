import express from 'express';
import { usersRouter } from './usersRouter.js';
import { entriesRouter } from './entriesRouter.js';

export const router = express.Router();

router.use(usersRouter);
router.use(entriesRouter);
