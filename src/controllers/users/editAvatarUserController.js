import { editAvatarService } from '../../services/users/editAvatarService.js';

import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { editAvatarSchema } from '../../schemas/users/editAvatarSchema.js';

export const editAvatarUserController = async (req, res, next) => {
	// Tareas:
	// 1. Recoger el id del usuario de la request. Si ha llegado hasta aquí, el usuario existe y está logueado
	// 2. Recoger el archivo de la request. Si no hay archivo, lanzar un error
	// 3. Comprobar

	try {
		// Recoger el id del usuario de la request
		const { id } = req.user;

		// Validar req.files
		await validateSchemaUtil(editAvatarSchema, req.files || {});

		// Recoger el archivo de la request
		const { avatar } = req.files; // avatar es el nombre del campo del formulario

		// Llamar al service para guardar la imagen
		const user = await editAvatarService(id, avatar);

		// responder al cliente
		res.status(201).send({
			status: 'ok',
			message: 'Avatar actualizado',
			data: { user },
		});
	} catch (error) {
		next(error);
	}
};
