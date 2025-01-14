import { getUserByIdService } from '../../services/users/getUserByIdService.js';

export const getUserByIdController = async (req, res, next) => {
	// Tareas:
	// 1. Obtener el id del usuario
	// 2. Obtener el usuario. Si no existe, devolver un error
	// 3. Responder con el usuario

	try {
		// 1. Obtener el id del usuario
		const { id } = req.params;

		// 2. Obtener el usuario. Si no existe, devolver un error
		const user = await getUserByIdService(id);

		// 3. Responder con el usuario
		res.status(200).send({
			status: 'OK',
			message: 'Usuario encontrado',
			data: { user },
		});
	} catch (error) {
		next(error);
	}
};
