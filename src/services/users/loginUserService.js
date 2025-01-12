import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';
import { SECRET } from '../../../env.js';

export const loginUserService = async (email, password) => {
	// Tareas:
	// 1. Comprobar si el usuario existe. Lo haremos con el modelo. Si no existe, lanzar un error
	// 2. Comprobar si la contraseña es correcta. Lo haremos con bcrypt. Si no es correcta, lanzar un error
	// 3. Comprobar si el usuario está activo. Si no está activo, lanzar un error
	// 4. Generar token. Lo haremos con JWT
	// 5. Devolver token

	// Buscar si el usuario ya existe por email
	const user = await selectUserByEmailModel(email);

	// Comprobar si la contraseña es correcta
	let isValidPassword = false;

	if (user) {
		isValidPassword = await bcrypt.compare(password, user.password);
	}

	if (!user || !isValidPassword) {
		throw generateErrorUtils(
			400,
			'USER_NOT_FOUND',
			'El usuario o la contraseña no son correctos'
		);
	}

	// Comprobar si el usuario está activo
	if (!user.active) {
		throw generateErrorUtils(
			400,
			'USER_NOT_ACTIVE',
			'El usuario no está activo. Revisa tu email'
		);
	}

	// Generar token
	const payload = {
		id: user.id,
		role: user.role,
	};

	const token = jwt.sign(payload, SECRET, {
		expiresIn: '1h',
	});

	return token;
};
