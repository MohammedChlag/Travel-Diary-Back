import { loginUserSchema } from '../../schemas/users/loginUserSchema.js';
import { loginUserService } from '../../services/users/loginUserService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const loginUserController = async (req, res, next) => {
	// Tareas:
	// 1. Recoger datos del body
	// 2. Validar si hay datos
	// 3. Comprobar si el usuario existe. Lo haremos en el servicio
	// 4. Comprobar si la contraseña es correcta. Lo haremos en el servicio
	// 5. Generar token. Lo haremos en el servicio
	// 6. Enviar respuesta
	try {
		const { email, password } = req.body;

		// Validar si hay datos
		await validateSchemaUtil(loginUserSchema, req.body);

		// Llamar al service que loguea al usuario. Devuelve el token
		const token = await loginUserService(email, password);
		// const token = 'token';

		// Enviar respuesta
		res
			.status(200)
			.send({ status: 'ok', message: 'User logged', data: { token } });
	} catch (error) {
		next(error);
	}
};
