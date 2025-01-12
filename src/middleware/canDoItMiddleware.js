import { generateErrorUtils } from '../utils/helpers.js';

export const canDoItMiddleware = async (req, res, next) => {
	// Tareas:
	// 1. Comprobar si el usuario puede editar una entrada

	try {
		// Datos del usuario autenticado
		const { id: idUserLogged, role: roleUserLogged } = req.user;

		// ID del usuario propietario de la entrada
		const { userId: idUserEntry } = req.entry;
		if (
			req.method === 'POST' &&
			req.body.value >= 1 &&
			req.body.value <= 5 &&
			idUserLogged === idUserEntry
		) {
			throw generateErrorUtils(403,'FORBIDDEN','No puedes votar tu propia entrada');
		} else if (req.method === 'DELETE') {
			// Permitir si el usuario es el dueño o es admin
			if (idUserLogged !== idUserEntry && roleUserLogged !== 'admin') {
				throw generateErrorUtils(403,'FORBIDDEN','No tienes permisos para eliminar esta entrada');
			}
		} else {
			// Para cualquier otro método, permitir solo si es el dueño
			if (idUserLogged !== idUserEntry) {
				throw generateErrorUtils(403,'FORBIDDEN','No tienes permisos para realizar esta acción');
			}
		}

		next();
	} catch (error) {
		next(error);
	}
};