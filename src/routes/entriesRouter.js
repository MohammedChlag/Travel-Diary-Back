import express from 'express';

import { getAllEntriesController } from '../controllers/entries/getAllEntriesController.js';
import { newEntryController } from '../controllers/entries/newEntryController.js';
import { getEntryByIdController } from '../controllers/entries/getEntryByIdController.js';
import { editEntryController } from '../controllers/entries/editEntryController.js';
import { newEntryPhotosController } from '../controllers/entries/newEntryPhotosController.js';
import { removeEntryController } from '../controllers/entries/removeEntryController.js';
import { removeEntryPhotoController } from '../controllers/entries/removeEntryPhotoController.js';
import { newEntryVoteController } from '../controllers/entries/newEntryVoteController.js';

import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { entryExistsMiddleware } from '../middlewares/entryExistsMiddleware.js';
import { canDoItMiddleware } from '../middlewares/canDoItMiddleware.js';

export const entriesRouter = express.Router();

entriesRouter.post('/entries', authUserMiddleware, newEntryController);

entriesRouter.get('/entries', getAllEntriesController);
entriesRouter.get(
	'/entries/:id',
	entryExistsMiddleware,
	getEntryByIdController
);

// Actualizar una entrada
entriesRouter.put(
	'/entries/:id',
	authUserMiddleware,
	entryExistsMiddleware,
	canDoItMiddleware,
	editEntryController
);

// Eliminar una entrada
entriesRouter.delete(
	'/entries/:id',
	authUserMiddleware,
	entryExistsMiddleware,
	canDoItMiddleware,
	removeEntryController
);

// Añadir fotos a una entrada
entriesRouter.post(
	'/entries/:id/photos',
	authUserMiddleware,
	entryExistsMiddleware,
	canDoItMiddleware,
	newEntryPhotosController
);

// Eliminar fotos de una entrada
entriesRouter.delete(
	'/entries/:id/photos',
	authUserMiddleware,
	entryExistsMiddleware,
	canDoItMiddleware,
	removeEntryPhotoController
);

// Votar una entrada
entriesRouter.post(
	'/entries/:id/votes',
	authUserMiddleware,
	entryExistsMiddleware,
	newEntryVoteController
);
