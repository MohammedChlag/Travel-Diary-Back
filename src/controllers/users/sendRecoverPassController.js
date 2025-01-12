import { editRecoveryPassCodeService } from '../../services/users/editRecoveryPassCodeService.js';
import { getUserByEmailService } from '../../services/users/getUserByEmailService.js';

export const sendRecoverPassController = async (req, res, next) => {
	// Tareas:
	// 1. Recuperar el email del body
	// 2. Buscar el usuario por email
	// 3. Guardar el recoveryPassCode en el usuario
	try {
		// 1. Recuperar el email del body
		const { email } = req.body;

		// 2. Buscar el usuario por email
		const user = await getUserByEmailService(email);

		// 3. Guardar el recoveryPassCode en el usuario
		const recoveryPassCode = await editRecoveryPassCodeService(user.id, email);

		res.status(200).send({
			status: 'ok',
			message: 'El código de recuperación se ha enviado correctamente',
			data: { recoveryPassCode },
		});
	} catch (error) {
		next(error);
	}
};
