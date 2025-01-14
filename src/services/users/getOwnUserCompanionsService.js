import { selectCompanionsByUserIdModel } from '../../models/usersEntriesCompanions/selectCompanionsByUserIdModel.js';

export const getOwnUserCompanionsService = async (id) => {
	// Tareas:
	// 1. Buscar los compañeros del usuario autenticado.Lo hará el modelo. Si no hay compañeros, devolver un error
	// 2. Devolver los compañeros del usuario autenticado

	// 1. Buscar los compañeros del usuario autenticado
	const companions = await selectCompanionsByUserIdModel(id);
	if (!companions) {
		throw generateErrorUtils(
			404,
			'COMPANIONS_NOT_FOUND',
			'No se han encontrado compañeros'
		);
	}

	// 2. Devolver los compañeros del usuario autenticado
	return companions;
};
