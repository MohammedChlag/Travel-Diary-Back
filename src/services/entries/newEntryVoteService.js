import crypto from 'crypto';

import { insertVoteModel } from '../../models/usersEntriesVotes/insertVoteModel.js';
import { selectVotesByUserIdEntryIdModel } from '../../models/usersEntriesVotes/selectVotesByUserIdEntryIdModel.js';

import { generateErrorUtils } from '../../utils/helpersUtils.js';
import { selectEntryByIdModel } from '../../models/entries/selectEntryByIdModel.js';

export const newEntryVoteService = async (userId, entryId, value) => {
	// Tareas:
	// 1. Comprobar si el usuario ya ha votado
	// 2. Crear un nuevo voto
	// 3. Obtener la entrada actualizada
	// 4. Devolver la entrada actualizada

	// 1. Comprobar si el usuario ya ha votado
	const vote = await selectVotesByUserIdEntryIdModel(userId, entryId);

	if (vote) {
		throw generateErrorUtils(403, 'FORBIDDEN', 'Ya has votado esta entrada');
	}

	// 2. Crear un nuevo voto
	const id = crypto.randomUUID();
	const result = await insertVoteModel(id, userId, entryId, value);

	// 3. Obtener la entrada actualizada
	const entry = await selectEntryByIdModel(entryId);

	// 4. Devolver la entrada actualizada
	return entry;
};
