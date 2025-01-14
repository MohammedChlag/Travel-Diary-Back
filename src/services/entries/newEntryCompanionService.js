import crypto from 'crypto';

import { insertCompanionModel } from '../../models/usersEntriesCompanions/insertCompanionModel.js';
import { selectCompanionsByEntryIdModel } from '../../models/usersEntriesCompanions/selectCompanionsByEntryIdModel.js';

export const newEntryCompanionService = async (entry, companions) => {
	// Tareas:
	// 1. Comprobar si el usuario ya está añadido como compañero
	// 2. Insertar los compañeros a la entrada en la base de datos
	// 3. Añadir los compañeros a la entrada
	// 4. Devolver la entrada actualizada

	// 1. Comprobar si el usuario ya está añadido como compañero
	const companionsActuallyList = selectCompanionsByEntryIdModel(entry.id);

	// crear un array con los userId de los companions que ya estan en companionsActuallyList
	let companionsAlreadyExist = [];
	if (companionsActuallyList.length > 0) {
		companionsAlreadyExist = companions.filter((companion) =>
			companionsActuallyList.includes(companion)
		);
	}

	if (companionsAlreadyExist.length > 0) {
		throw generateErrorUtils(
			403,
			'FORBIDDEN',
			`Los usuarios "${companionsAlreadyExist.join(
				', '
			)}" ya están añadidos como compañeros`
		);
	}

	// 2. Añadir los compañeros a la entrada. Debo recorrer el array companions y añadir cada uno de ellos a la entrada
	for (const companion of companions) {
		const id = crypto.randomUUID();
		const result = await insertCompanionModel(id, entry.id, companion);

		if (result.affectedRows !== 1) {
			throw generateErrorUtils(
				500,
				'ERROR',
				'No se ha podido añadir el compañero'
			);
		}
	}

	// 3. Añadir los compañeros a la entrada
	entry.companions = [...entry.companions, ...companions];

	// 4. Devolver la entrada actualizada
	return entry;
};
