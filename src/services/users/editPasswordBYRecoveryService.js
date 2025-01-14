import bcrypt from 'bcrypt';

import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';
import { updatePasswordByRecoveryModel } from '../../models/users/updatePasswordByRecoveryModel.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';

export const editPasswordBYRecoveryService = async (
	email,
	recoveryPassCode,
	newPassword,
	newPasswordConfirm
) => {
	// Tareas:
	// 1. Buscar el usuario por email. Lo haremos con el modelo. Si no se ha encontrado, lanzar un error
	// 2. Comprobar que el recoveryPassCode del usuario encontrado es igual al recoveryPassCode del body. Si no es igual, lanzar un error
	// 3. Comprobar que newPassword y newPasswordConfirm son iguales. Si no son iguales, lanzar un error
	// 4. Actualizar la contraseña del usuario y borrar el recoveryPassCode. Lo haremos con el modelo. Si no se ha podido actualizar, lanzar un error
	// 5. Devolver el resultado

	// 1. Buscar el usuario por email
	const user = await selectUserByEmailModel(email);

	// 2. Comprobar que el recoveryPassCode del usuario encontrado es igual al recoveryPassCode del body
	if (!user || user.recoveryPassCode !== recoveryPassCode) {
		throw generateErrorUtils(409, 'Email o código de recuperación incorrectos');
	}

	// 3. Comprobar que newPassword y newPasswordConfirm son iguales
	if (newPassword !== newPasswordConfirm) {
		throw generateErrorUtils(409, 'Las contraseñas no coinciden');
	}

	// 4. Actualizar la contraseña del usuario
	const passwordHash = await bcrypt.hash(newPassword, 10);

	const resultPass = await updatePasswordByRecoveryModel(user.id, passwordHash);
	if (resultPass.affectedRows !== 1) {
		throw generateErrorUtils(500, 'Error al actualizar la contraseña');
	}

	// 5. Devolver el resultado
	delete user.recoveryPassCode;
	delete user.password;

	return user;
};
