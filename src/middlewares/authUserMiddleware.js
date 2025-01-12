import { generateErrorUtils } from '../utils/helpersUtils.js';
import {
	checkExtractTokenUtils,
	verifyTokenPayloadUtils,
} from '../utils/tokenUtils.js';
import { SECRET } from '../../env.js';

export const authUserMiddleware = async (req, res, next) => {
	// Tareas:
	// 1. Recoger el token del header
	// 2. Comprobar si hay token
	// 3. Verificar si el token empieza por Bearer
	// 4. Extraer el token
	// 5. Comprobar si el formato de token es correcto y extraerlo
	// 6. Verificar el token y extraer el payload
	// 7. Guardar el payload en req

	try {
		// Recoger el token del header
		const { authorization } = req.headers;

		// Comprobar si hay token
		if (!authorization) {
			throw generateErrorUtils(
				401,
				'TOKEN_MISSING',
				'Falta el token en los headers'
			);
		}

		// Verificar y extraer el token
		const token = checkExtractTokenUtils(authorization);

		// Extraer el payload
		const payload = verifyTokenPayloadUtils(token, SECRET);

		// Guardar el payload en req. con esto añadimos la info del usuario(id y role) a la request
		req.user = payload;

		// Pasamos al siguiente middleware
		next();
	} catch (error) {
		next(error);
	}
};
