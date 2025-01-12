import { editEntryService } from '../../services/entries/editEntryService.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';

export const editEntryController = async (req, res, next) => {
	// Tareas:
	// 1. Obtener la entry de req.entry y que pase por el getEntryByIdService para que venga con las fotos
	// 2. Obtener la info del body. Si no existe, devolver un error
	// 3. Comprobar que los datos son correctos. Si no, devolver un error
	// 4. Editar la entrada. Lo va a hacer el servicio. Si hay errores, lanzar el error
	// 5. Responder al cliente
	try {
		// 1. Obtener la entry de req.entry
		const oldEntry = req.entry;
		console.log('oldEntry', oldEntry);

		// 2. Obtener la info del body. Si no existe, devolver un error
		const newEntry = req.body;
		if (!newEntry) {
			throw generateErrorUtils(400, 'DATA_MISSING', 'No se han enviado datos');
		}

		const { title, place, description } = newEntry;
		if (!title || !place || !description) {
			throw generateErrorUtils(400, 'MISSING_PARAMETERS', 'Faltan parámetros');
		}

		// 4. Editar la entrada
		const entry = await editEntryService({
			id: oldEntry.id,
			...newEntry,
		});

		// 5. Responder al cliente
		res.status(200).send({
			status: 'Ok',
			message: 'Entrada editada',
			data: {
				entry: { ...oldEntry, ...entry },
			},
		});
	} catch (error) {
		next(error);
	}
};
