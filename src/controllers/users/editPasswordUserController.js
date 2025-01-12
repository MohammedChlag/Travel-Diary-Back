import { editPasswordUserService } from '../../services/users/editPasswordUserService.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';

export const editPasswordUserController = async (req, res, next) => {
	// Tareas:
	// 1. Obtener el id de req.user
	// 2. Obtener la info de req.body. Si no hay info, devolver un error
	// 3. Validar la info de req.body. Esto lo hará JOI. Si hay errores, devolver un error
	// 4. Buscar el usuario en la base de datos por id. Lo hará el servicio.
	// 5. Verificar que la contraseña actual sea correcta. Lo hará el servicio. Si no lo es, devolver un error
	// 6. Comprobar que la nueva contraseña y la confirmación de la nueva contraseña sean iguales. Lo hará el servicio. Si no lo son, devolver un error
	// 7. Encriptar la nueva contraseña. Lo hará el servicio
	// 8. Actualizar la contraseña en la base de datos. Lo hará el servicio
	// 9. Responder con el usuario actualizado.

	try {
		// 1. Obtener el id de req.user
		const { id } = req.user;

		// 2. Obtener la info de req.body. Si no hay info, devolver un error
		const { oldPassword, newPassword, confirmNewPassword } = req.body;
		if (!oldPassword || !newPassword || !confirmNewPassword) {
			throw generateErrorUtils(400, 'DATA_MISSING', 'Faltan datos');
		}

		// 3. Validar la info de req.body. Esto lo hará JOI. Si hay errores, devolver un error
		// 4. Llamar al servio
		const user = await editPasswordUserService(
			id,
			oldPassword,
			newPassword,
			confirmNewPassword
		);

		// 9. Responder con el usuario actualizado.
		res.status(200).send({
			status: 'ok',
			message: 'Contraseña actualizada correctamente',
			data: user,
		});
	} catch (error) {
		next(error);
	}
};
