import { activeUserService } from '../../services/users/activeUserService.js';

export const activeUserController = async (req, res, next) => {
	// Tareas:
	// 1. Recoger el código de registro de la URL
	// 2. Comprobar si hay código de registro. Si no lo hay, lanzar un error
	// 3. Activar el usuario. Lo haremos en el servicio. Si no se ha podido activar, lanzar un error
	// 4. Enviar respuesta

	try {
		const { registrationCode } = req.params;

		// Comprobar si hay código de registro
		if (!registrationCode) {
			throw generateErrorUtils(
				400,
				'REGISTRATION_CODE_MISSING',
				'El código de registro es obligatorio'
			);
		}

		// Llamar al service que activa al usuario
		const user = await activeUserService(registrationCode);

		// Enviar respuesta
		res
			.status(200)
			.send({ status: 'ok', message: 'User activated', data: user });
	} catch (error) {
		next(error);
	}
};
