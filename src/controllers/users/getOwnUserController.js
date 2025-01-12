import { ownUserService } from '../../services/users/ownUserService.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';

export const getOwnUserController = async (req, res, next) => {
	// Tareas:
	// 1. Recoger el id del usuario de la request. Si no existe, lanzar un error
	// 2. Buscar el usuario en la base de datos. Lo hara el servicio. Si no existe, lanzar un error
	// 3. Devolver el usuario

	try {
		// Recoger el id del usuario de la request
		const { id } = req.user;
		if (!id) {
			throw generateErrorUtils(
				401,
				'USER_NOT_AUTHORIZED',
				'El usuario no está autorizado'
			);
		}

		// Buscar el usuario en la base de datos
		const user = await ownUserService(id);

		// Devolver el usuario
		res.status(200).json({
			status: 'ok',
			message: 'Usuario encontrado',
			data: user,
		});
	} catch (error) {
		next(error);
	}
};
