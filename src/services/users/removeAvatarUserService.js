import path from 'path';

import { deleteAvataruserModel } from '../../models/users/deleteAvataruserModel.js';
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';
import { deletePhotoUtil } from '../../utils/photoUtils.js';

export const removeAvatarUserService = async (id) => {
	// Tareas:
	// 1. Buscar el usuario en la base de datos por id
	// 2. Si el usuario no tiene avatar, lanzar un error
	// 3. Si el usuario tiene avatar, borrarlo de la base de datos. Lo va a hacer el modelo. Si no se ha podido borrar, lanzar un error
	// 4. Borrar el avatar del sistema de archivos. Lo va a hacer deletePhotoUtil. Si no se ha podido borrar, lanzar un error
	// 5. Devolver el usuario actualizado

	// Buscar el usuario en la base de datos por id
	const user = await selectUserByIdModel(id);
	console.log('user', user);

	// Si el usuario no tiene avatar, lanzar un error
	if (!user.avatar) {
		throw generateErrorUtils(
			400,
			'USER_HAS_NOT_AVATAR',
			'El usuario no tiene avatar'
		);
	}

	// Borrar el avatar de la base de datos
	const result = await deleteAvataruserModel(id);

	// Si no se ha podido borrar, lanzar un error
	if (result.affectedRows !== 1) {
		throw generateErrorUtils(
			500,
			'DELETE_AVATAR_ERROR',
			'No se ha podido borrar el avatar'
		);
	}

	const userRelativePath = `src/uploads/avatars/${id}`;

	// Borrar el avatar del sistema de archivos
	const avatarPath = path.join(process.cwd(), userRelativePath, user.avatar);
	await deletePhotoUtil(avatarPath);

	// Eliminar el password del usuario
	delete user.password;

	return { ...user, avatar: null };
};
