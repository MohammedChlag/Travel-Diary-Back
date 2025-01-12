import { getEntryByIdService } from '../services/entries/getEntryByIdService.js';

export const entryExistsMiddleware = async (req, res, next) => {
	// Tareas:
	// 1. Obtener el id de la entrada de los params
	// 2. Obtener la entrada de la base de datos.
	try {
		const { id } = req.params;
		const entry = await getEntryByIdService(id);

		// Adjuntar la entrada al objeto req
		req.entry = entry;

		next();
	} catch (error) {
		next(error);
	}
};
