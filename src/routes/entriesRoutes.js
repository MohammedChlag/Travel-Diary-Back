import express from 'express';

import { selectAllEntriesController } from '../controllers/entries/selectAllEntriesController.js';
import { authUserMiddleware } from '../middleware/authUserMiddleware.js';
import { newEntryController } from '../controllers/entries/newEntryController.js';
import { getEntryByIdController } from '../controllers/entries/getEntryByIdController.js';
import { editEntryController } from '../controllers/entries/editEntryController.js';
import { removeEntryController } from '../controllers/entries/removeEntryController.js';
import { newEntryPhotosController } from '../controllers/entries/newEntryPhotosController.js';
import { removeEntryPhotosController } from '../controllers/entries/removeEntryPhotoController.js';
import { entryExistsMiddleware } from '../middleware/entryExistsMiddleware.js';
import { canDoItMiddleware } from '../middleware/canDoItMiddleware.js';
import { newEntryVoteController } from '../controllers/entries/newEntryVoteController.js';

export const entriesRouter = express.Router()

entriesRouter.get('/entries', selectAllEntriesController)
entriesRouter.post('/entries', authUserMiddleware, newEntryController)
entriesRouter.get('/entries/:id', entryExistsMiddleware, getEntryByIdController);
entriesRouter.put('/entries/:id', authUserMiddleware, entryExistsMiddleware, canDoItMiddleware,	editEntryController);
entriesRouter.delete('/entries/:id', authUserMiddleware, entryExistsMiddleware,	canDoItMiddleware, removeEntryController);
entriesRouter.post('/entries/:id/photos', authUserMiddleware, entryExistsMiddleware, canDoItMiddleware,	newEntryPhotosController);
entriesRouter.delete('/entries/:id/photos',	authUserMiddleware,	entryExistsMiddleware, canDoItMiddleware, removeEntryPhotosController);
entriesRouter.post('/entries/:id/votes', authUserMiddleware, entryExistsMiddleware, canDoItMiddleware, newEntryVoteController);