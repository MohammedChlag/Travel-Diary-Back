import express from 'express';

import { getAllEntriesController } from '../controllers/entries/getAllEntriesController.js';
import { newEntryController } from '../controllers/entries/newEntryController.js';
import { getEntryByIdController } from '../controllers/entries/getEntryByIdController.js';
import { editEntryController } from '../controllers/entries/editEntryController.js';
import { newEntryPhotosController } from '../controllers/entries/newEntryPhotosController.js';
import { removeEntryController } from '../controllers/entries/removeEntryController.js';
import { removeEntryPhotosController } from '../controllers/entries/removeEntryPhotoController.js';
import { newEntryVoteController } from '../controllers/entries/newEntryVoteController.js';

import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { entryExistsMiddleware } from '../middlewares/entryExistsMiddleware.js';
import { canDoItMiddleware } from '../middlewares/canDoItMiddleware.js';
import { newEntryCompanionController } from '../controllers/entries/newEntryCompanionController.js';

export const entriesRouter = express.Router();

entriesRouter.post('/entries', authUserMiddleware, newEntryController);

entriesRouter.get('/entries', getAllEntriesController);
entriesRouter.get(
	'/entries/:id',
	entryExistsMiddleware,
	getEntryByIdController
);
entriesRouter.put(
	'/entries/:id',
	authUserMiddleware,
	entryExistsMiddleware,
	canDoItMiddleware,
	editEntryController
);
entriesRouter.delete(
	'/entries/:id',
	authUserMiddleware,
	entryExistsMiddleware,
	canDoItMiddleware,
	removeEntryController
);

entriesRouter.post(
	'/entries/:id/photos',
	authUserMiddleware,
	entryExistsMiddleware,
	canDoItMiddleware,
	newEntryPhotosController
);

entriesRouter.delete(
	'/entries/:id/photos',
	authUserMiddleware,
	entryExistsMiddleware,
	canDoItMiddleware,
	removeEntryPhotosController
);

entriesRouter.post(
	'/entries/:id/votes',
	authUserMiddleware,
	entryExistsMiddleware,
	newEntryVoteController
);

entriesRouter.post(
	'/entries/:id/companions',
	authUserMiddleware, // Verifica que el usuario está autenticado
	entryExistsMiddleware, // Verifica que la entrada existe
	canDoItMiddleware, // Verifica que el usuario sea el propietario de la entrada
	newEntryCompanionController // Añade los compañeros a la entrada
);
