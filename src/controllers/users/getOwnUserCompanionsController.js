import { getOwnUserCompanionsService } from '../../services/users/getOwnUserCompanionsService.js';

export const getOwnUserCompanionsController = async (req, res, next) => {
	// Tareas:
	// 1. Obtener el id del usuario autenticado
	// 2. Obtener los compañeros del usuario autenticado. Lo hara el service. Si no hay compañeros, devolver un error
	// 3. Devolver los compañeros del usuario autenticado
	try {
		// 1. Obtener el id del usuario autenticado
		const { id } = req.user;
		if (!id) {
			throw generateErrorUtils(
				401,
				'USER_NOT_AUTHORIZED',
				'El usuario no está autorizado'
			);
		}

		// 2. Obtener los compañeros del usuario autenticado
		const companions = await getOwnUserCompanionsService(id);

		// 3. Devolver los compañeros del usuario autenticado
		res.status(200).send({
			status: 'ok',
			message: 'Compañeros encontrados',
			data: { companions },
		});
	} catch (error) {
		next(error);
	}
};
