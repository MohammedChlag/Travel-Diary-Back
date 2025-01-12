import randomstring from 'randomstring';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { insertUserModel } from '../../models/users/insertUserModel.js';
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';
import { selectUserByUsernameModel } from '../../models/users/selectUserByUsernameModel.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';
import { sendEmailBrevoUtil } from '../../utils/sendEmailBrevoUtil.js';

export const registerUserService = async (username, email, password) => {
	// Tareas:
	// 1. Comprobar si el usuario ya existe por username. Lo haremos con el modelo. Si existe, lanzar un error
	// 2. Comprobar si el usuario ya existe por email. Lo haremos con el modelo. Si existe, lanzar un error
	// 3. Hash de la contraseña
	// 4. Generar código de registro
	// 5. Crear usuario con todos los datos. Lo haremos con el modelo. Si no se ha podido insertar, lanzar un error
	// 6. Enviar el mail de confirmación
	// 7. Devolver el usuario creado

	// Buscar si el usuario ya existe por username
	const userByUsername = await selectUserByUsernameModel(username);
	if (userByUsername) {
		throw generateErrorUtils(
			400,
			'USER_ALREADY_EXISTS',
			'El username ya existe'
		);
	}

	// Buscar si el usuario ya existe por email
	const userByEmail = await selectUserByEmailModel(email);
	if (userByEmail) {
		throw generateErrorUtils(400, 'EMAIL_ALREADY_EXISTS', 'El email ya existe');
	}

	// Crear la id de usuario con crypto.randomUUID()
	const id = crypto.randomUUID();

	// Hash de la contraseña
	const passwordHash = await bcrypt.hash(password, 10); // 10 es el número de veces que se va a encriptar la contraseña. Cuanto mayor sea el número, más segura será la contraseña, pero también más lenta será la encriptación.

	// Generar código de registro
	// Codigo de registro del usuario. Lo he modificado a 15 en initDb.js
	const registrationCode = randomstring.generate(15);

	// Crear usuario
	const result = await insertUserModel({
		id,
		username,
		email,
		password: passwordHash,
		registrationCode,
	});

	if (result.affectedRows !== 1) {
		throw generateErrorUtils(500, 'ERROR_DB', 'No se pudo insertar el usuario');
	}

	// Enviar el mail de confirmación
	// Asunto del email
	const emailSubject = 'Activa tu cuenta de Travel Diary';
	// Cuerpo del email
	const emailText = `
    <h2>¡Bienvenid@ ${username} a Travel Diary! 🗺️</h2>
    <p>Gracias por registrarte en nuestra aplicación. Para activar tu cuenta, haz click en el siguiente enlace:</p>
    <p><a href="http://localhost:5173/validate/${registrationCode}">Activa tu cuenta</a></p>
    `;
	// Llamar al servicio que envía el email
	await sendEmailBrevoUtil(email, emailSubject, emailText);

	// Devolver el usuario creado
	return { id, username, email, registrationCode };
};
