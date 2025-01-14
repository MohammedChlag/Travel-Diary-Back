import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';

export const getUserByIdService = async (id) => {
	// Tareas:
	// 1. Obtener el usuario por su id. Si no existe, devolver un error
	// 2. Devolver el usuario

	const user = await selectUserByIdModel(id);

	if (!user) {
		throw generateErrorUtils(
			404,
			'USER_NOT_FOUND',
			'Usuario no encontrado o inactivo'
		);
	}

	return user;
};
