import crypto from 'crypto';

import { insertEntryModel } from '../../models/entries/insertEntryModel.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';

export const newEntryService = async (entry) => {
	// Tareas:
	// 1. Crear la id de la entrada con crypto.randomUUID()
	// 2. Crear una entrada en la base de datos. Lo haremos con el modelo. Si no se ha podido insertar, lanzar un error
	// 3. Devolver la entrada creada

	// 1. Crear la id de la entrada con crypto.randomUUID()
	const id = crypto.randomUUID();

	// 2. Crear una entrada en la base de datos
	const result = await insertEntryModel({
		id,
		...entry,
	});

	if (result.affectedRows !== 1) {
		throw generateErrorUtils(
			500,
			'ENTRY_NOT_CREATED',
			'No se ha podido crear la entrada'
		);
	}

	// 3. Devolver la entrada creada
	return {
		id,
		...entry,
	};
};
