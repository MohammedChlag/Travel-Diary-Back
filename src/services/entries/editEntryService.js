import { updateEntryModel } from '../../models/entries/updateEntryModel.js';

export const editEntryService = async (newEntry) => {
	// Tareas:
	// 1. Editar la entrada
	// 2. Devolver la entrada

	// 1. Editar la entrada
	const result = await updateEntryModel(newEntry);

	if (result.affectedRows !== 1) {
		throw generateErrorUtils(
			404,
			'ENTRY_NOT_UPDATED',
			'No se ha podido editar la entrada'
		);
	}

	// 2. Devolver la entrada
	return newEntry;
};
