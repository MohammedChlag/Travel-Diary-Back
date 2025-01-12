import path from 'path';

import { deleteEntryByIdModel } from '../../models/entries/deleteEntryByIdModel.js';
import { deletePathUtil } from '../../utils/foldersUtils.js';
import { generateErrorUtils } from '../../utils/helpers.js';

export const removeEntryService = async (entry) => {
	// Tareas:
	// 1. Borrar la entrada de la base de datos. Lo va a hacer el modelo. Si hay errores, lanzar el error
	// 2. Borrar las fotos de la entrada en la base de datos. Al eliminar la entrada, la DDBB se encarga de borrar las fotos en cascada.
	// 3. Borrar las fotos de la entrada del sistema de archivos.

	console.log('entry', entry);

	// 1. Borrar la entrada de la base de datos
	const result = await deleteEntryByIdModel(entry.id);
	if (result.affectedRows === 0) {
		throw generateErrorUtils(
			500,
			'DELETE_ENTRY_ERROR',
			'No se ha podido borrar la entrada'
		);
	}

	// 2. Borrar las fotos de la entrada en la base de datos

	// 3. Borrar las fotos de la entrada del sistema de archivos
	if (entry.photos.length) {
		const relativeEntryPath = path.join(
			'src/uploads/entries',
			entry.userId,
			entry.id
		);
		await deletePathUtil(relativeEntryPath);
	}

	return;
};
