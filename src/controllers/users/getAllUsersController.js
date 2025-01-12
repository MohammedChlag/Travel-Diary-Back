import { getAllUsersService } from '../../services/users/getAllUsersService.js';

export const getAllUsersController = async (req, res, next) => {
	// Tareas:
	// 1. Obtener todos los usuarios de la base de datos. Lo va a hacer el Service
	// 2. Enviar los usuarios al cliente
	try {
		const users = await getAllUsersService();

		res.status(200).send({
			status: 'Ok',
			message: 'Lista de usuarios',
			data: { users },
		});
	} catch (error) {
		next(error);
	}
};
