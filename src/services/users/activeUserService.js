import { selectUserByRegistrationCodeModel } from '../../models/users/selectUserByRegistrationCodeModel.js';
import { updateActiveUserModel } from '../../models/users/updateActiveUserModel.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';

export const activeUserService = async (registrationCode) => {
	// Tareas:
	// 1. Comprobar si el usuario ya existe por registrationCode. Lo haremos con el modelo. Si no existe, lanzar un error
	// 2. Comprobar si el usuario ya está activo. Si ya está activo, lanzar un error
	// 3. Activar el usuario. Lo haremos con el modelo. Si no se ha podido activar, lanzar un error
	// 4. Devolver el usuario activado

	// Buscar si el usuario ya existe por registrationCode
	const user = await selectUserByRegistrationCodeModel(registrationCode);
	if (!user) {
		throw generateErrorUtils(400, 'USER_NOT_FOUND', 'El usuario no existe');
	}

	if (user.active === 1) {
		throw generateErrorUtils(
			400,
			'USER_ALREADY_ACTIVE',
			'El usuario ya está activo'
		);
	}

	// Activar el usuario
	const result = await updateActiveUserModel(registrationCode);
	if (result.affectedRows !== 1) {
		throw generateErrorUtils(500, 'ERROR_DB', 'No se pudo activar el usuario');
	}

	return { ...user, active: 1 };
};
