import { removeAvatarUserService } from '../../services/users/removeAvatarUserService.js';

export const removeAvatarUserController = async (req, res, next) => {
	// Tareas:
	// 1. Recoger el id del usuario de la request. Si ha llegado hasta aquí, el usuario existe y está logueado
	// 2. Borrar el avatar del usuario. Lo va a hacer el service. Si el usuario no tiene avatar, no hacer nada, si hay borrarlo de la base de datos y del sistema de archivos
	// 3. Responder al cliente

	try {
		// Recoger el id del usuario de la request
		const { id } = req.user;

		// Llamar al service para borrar el avatar
		const user = await removeAvatarUserService(id);

		// responder al cliente
		res.status(201).send({
			status: 'ok',
			message: 'Avatar eliminado',
			data: { user },
		});
	} catch (error) {
		next(error);
	}
};
