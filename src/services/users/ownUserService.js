import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';

export const ownUserService = async (id) => {
	// Tareas:
	// 1. Comprobar si el usuario existe. Lo hará el modelo. Si no existe, lanzar un error
	// 2. Devolver el usuario

	// Comprobar si el usuario existe
	const user = await selectUserByIdModel(id);

	// Si no existe, lanzar un error. Si se llego a este punto, el usuario existe porque está logueado
	if (!user) {
		throw generateErrorUtils(404, 'USER_NOT_FOUND', 'El usuario no existe');
	}

	// Eliminar el password del usuario
	delete user.password;

	return user;
};
