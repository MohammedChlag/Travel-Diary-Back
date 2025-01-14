import { newEntryCompanionService } from '../../services/entries/newEntryCompanionService.js';
import { getUserByIdService } from '../../services/users/getUserByIdService.js';

export const newEntryCompanionController = async (req, res, next) => {
	// Tareas:
	// 1. Obtener los datos necesarios
	// 2. Comprobar que el compañero existen
	// 3. Añadir los compañeros  a la entrada
	// 4. Responder con la entrada actualizada
	try {
		// 1. Obtener los datos necesarios
		const companions = Object.values(req.body);
		const entry = req.entry;

		console.log('entry', entry);

		// 2. Comprobar que el o los compañeros existen
		for (const companion of companions) {
			const user = await getUserByIdService(companion);
		}

		// 3. Añadir los compañeros a la entrada
		const entryCompanions = await newEntryCompanionService(entry, companions);

		// 4. Responder con la entrada actualizada
		res.status(200).send({
			status: 'OK',
			message: 'Compañeros añadidos con éxito',
			data: { entry: entryCompanions },
		});
	} catch (error) {
		next(error);
	}
};
