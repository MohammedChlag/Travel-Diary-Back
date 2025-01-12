import bcrypt from 'bcrypt';

import { updatePasswordModel } from '../../models/users/updatePasswordModel.js';
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';

export const editPasswordUserService = async (
	id,
	oldPassword,
	newPassword,
	confirmNewPassword
) => {
	// Tareas:
	// 1. Buscar el usuario en la base de datos por id
	// 2. Verificar que la contraseña actual sea correcta. Si no lo es, devolver un error
	// 3. Comprobar que la nueva contraseña y la confirmación de la nueva contraseña sean iguales. Si no lo son, devolver un error
	// 4. Encriptar la nueva contraseña
	// 5. Actualizar la contraseña en la base de datos
	// 6. Devolver el usuario actualizado

	// 1. Buscar el usuario en la base de datos por id
	const user = await selectUserByIdModel(id);
	console.log('user', user);

	// 2. Verificar que la contraseña actual sea correcta. Si no lo es, devolver un error
	const isMatch = await bcrypt.compare(oldPassword, user.password);
	if (!isMatch) {
		throw generateErrorUtils(
			400,
			'WRONG_PASSWORD',
			'La contraseña actual es incorrecta'
		);
	}

	// 3. Comprobar que la nueva contraseña y la confirmación de la nueva contraseña sean iguales. Si no lo son, devolver un error
	if (newPassword !== confirmNewPassword) {
		throw generateErrorUtils(
			400,
			'PASSWORDS_DO_NOT_MATCH',
			'Las contraseñas no coinciden'
		);
	}

	// 4. Encriptar la nueva contraseña
	const newpasswordHash = await bcrypt.hash(newPassword, 10);

	// 5. Actualizar la contraseña en la base de datos
	const result = await updatePasswordModel(id, newpasswordHash);
	if (result.affectedRows !== 1) {
		throw generateErrorUtils(
			500,
			'ERROR_UPDATING_PASSWORD',
			'Error al actualizar la contraseña'
		);
	}

	// Eliminar el password del usuario
	delete user.password;

	// 6. Devolver el usuario actualizado
	return user;
};
