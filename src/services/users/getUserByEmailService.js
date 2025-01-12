import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';

export const getUserByEmailService = async (email) => {
	// Tareas:
	// 1. Buscar el usuario por email. Lo va a hacer el modelo. Si no existe, devolver un error
	// 2. Devolver el usuario

	const user = await selectUserByEmailModel(email);
	if (!user) {
		throw generateErrorUtils(
			404,
			'NO_USER_FOUND',
			'No se ha encontrado el usuario'
		);
	}

	return user;
};
