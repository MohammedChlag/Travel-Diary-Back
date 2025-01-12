import bcrypt from 'bcrypt';
import randomstring from 'randomstring';

import { insertUserModel } from "../../models/users/insertUserModel.js";
import { selectUserByUsernameModel } from "../../models/users/selectUserByUsernameModel.js";
import { selectUserByEmailModel } from "../../models/users/selectUserByEmailModel.js";
import { generateErrorUtils } from "../../utils/helpers.js";
import { sendEmailBrevoUtil } from '../../utils/sendEmailBrevoUtil.js';

export const registreUserServices = async (username, email, password) => {

    // Buscar si el usuario ya existe por username
	const userByUsername = await selectUserByUsernameModel(username);
	if (userByUsername) {
		throw generateErrorUtils(400,'USER_ALREADY_EXISTS','El username ya existe');
	}

	// Buscar si el usuario ya existe por email
	const userByEmail = await selectUserByEmailModel(email);
	if (userByEmail) {
		throw generateErrorUtils(400, 'EMAIL_ALREADY_EXISTS', 'El email ya existe');
	}
	const id = crypto.randomUUID()

    // Hash de password
    const passwordHash = await bcrypt.hash(password, 10);

    // Generar codigo de registro
    const registrationCode = randomstring.generate(15);

	// Crear usuario
	const result = await insertUserModel({id,username, email, password: passwordHash,registrationCode});

	if (result.affectedRows !== 1) {
		throw generateErrorUtils(500, 'ERROR_DB', 'No se pudo insertar el usuario');
	}
	
 	// Enviar el mail de confirmación
	const emailSubject = 'Activa tu cuenta en Travel Diary';
	const emailText = `
	¡Bienvenid@ ${username} a Travel Diary! 🗺️
	\nGracias por registrarte en nuestra aplicación. Para activar tu cuenta, haz click en el siguiente enlace:
	\n<a href="http://localhost:3000/activate/${registrationCode}">Activa tu cuenta</a>
	`;

    // llamar a la funcion que envia el email
    await sendEmailBrevoUtil(email, emailText, emailSubject);
        

	return { id, username, email, registrationCode };

};