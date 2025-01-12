import { selectAllusersModel } from '../../models/users/selectAllusersModel.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';

export const getAllUsersService = async () => {
	// Tareas:
	// 1. Obtener todos los usuarios de la base de datos.Lo va a hacer el modelo. Si no hay usuarios, devolver un error
	// 2. Devolver los usuarios

	const users = await selectAllusersModel();

	if (!users.length) {
		throw generateErrorUtils(
			404,
			'NO_USERS_FOUND',
			'No se han encontrado usuarios'
		);
	}

	return users;
};
