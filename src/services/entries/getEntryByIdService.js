import { selectEntryByIdModel } from '../../models/entries/selectEntryByIdModel.js';
import { selectPhotosByEntryIdModel } from '../../models/photos/selectPhotosByEntryIdModel.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';

export const getEntryByIdService = async (id) => {
	// Tareas:
	// 1. Obtener la entrada de la base de datos.Lo va a hacer el modelo. Si no existe, devolver un error
	// 2. Obtener las fotos de la entrada
	// 3. Devolver la entrada con las fotos

	const entry = await selectEntryByIdModel(id);

	if (!entry) {
		throw generateErrorUtils(
			404,
			'ENTRY_NOT_FOUND',
			'No se ha encontrado la entrada'
		);
	}

	const photos = await selectPhotosByEntryIdModel(entry.id);
	entry.photos = photos;

	return entry;
};
