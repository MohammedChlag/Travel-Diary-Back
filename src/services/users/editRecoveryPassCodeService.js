import randomstring from 'randomstring';

import { updateRecoveryPassCodeModel } from '../../models/users/updateRecoveryPassCodeModel.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';
import { sendEmailBrevoUtil } from '../../utils/sendEmailBrevoUtil.js';

export const editRecoveryPassCodeService = async (id, email) => {
	// Tareas:
	// 1.  Crear un código de recuperación
	// 2. Actualizar el recoveryPassCode en el usuario. Lo haremos con el modelo. Si no se ha podido actualizar, lanzar un error
	// 3. Mandar un email
	// 4. Devolver el recoveryPassCode

	// 1. Crear un código de recuperación
	const recoveryPassCode = randomstring.generate(15);

	// 2. Actualizar el recoveryPassCode en el usuario
	const result = await updateRecoveryPassCodeModel(id, recoveryPassCode);
	if (result.affectedRows !== 1) {
		throw generateErrorUtils();
	}

	// 3. Enviar el mail de confirmación
	const emailSubject = 'Recuperación de la contraseña de Travel Diary';
	const emailText = `
	<h2>¡Recuperación de la contraseña para: ${email}!</h2>
	<p>Ha solicitado la recuperación de la contraseña de Travel Diary.</p>
	<p>Utilice el siguiente código de recuperacion para crear una nueva contraseña.</p>
  <p>Código de recuperación: <strong>${recoveryPassCode}</strong></p>
  <br>
  <p>Si no ha solicitado la recuperación de la contraseña, ignore este mensaje.</p>
	`;

	// Llamar a la funcion que envia el email
	await sendEmailBrevoUtil(email, emailSubject, emailText);

	// 4. Devolver el recoveryPassCode
	return recoveryPassCode;
};
