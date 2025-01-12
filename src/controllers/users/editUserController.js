import { editUserService } from '../../services/users/editUserService.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';

export const editUserController = async (req, res, next) => {
	// Tareas:
	// 1. Obtener el id de req.user
	// 2. Obtener los datos del body
	// 3. Validar los datos. Esto lo va a hacer JOI. Si hay errores, devolver un error 400
	// 4. Actualizar los datos del usuario. Lo va a hacer el servicio. Si hay errores, lanzar el error
	// 5. Responder al cliente

	try {
		// 1. Obtener el id de los params
		const { id } = req.user;
		// 2. Obtener los datos del body
		const newUserInfo = req.body;
		if (!newUserInfo) {
			throw generateErrorUtils(
				400,
				'INFO_MISSING',
				'No se han enviado datos para actualizar'
			);
		}

		// Esto lo cambiaremos por JOI
		if (!newUserInfo.username || !newUserInfo.email) {
			throw generateErrorUtils(
				400,
				'INFO_MISSING',
				'Faltan datos para actualizar'
			);
		}
		// 3. Validar los datos. Esto lo va a hacer JOI. Si hay errores, devolver un error 400
		// 4. Actualizar los datos del usuario
		const updatedUser = await editUserService(id, newUserInfo);
		// 5. Responder al cliente
		res.status(200).send({
			status: 'ok',
			message: 'usuario actualizado',
			data: updatedUser,
		});
	} catch (error) {
		next(error);
	}
};
