import { newUserSchema } from '../../schemas/users/newUserSchema.js';
import { registerUserService } from '../../services/users/registerUserService.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const registerUserController = async (req, res, next) => {
	// Tareas:
	// 1. Validar si hay datos
	// 2. Recoger datos del body
	// 3. Comprobar si el username ya existe. Lo haremos en el servicio
	// 4. Comprobar si el email ya existe. Lo haremos en el servicio
	// 5. Hashear la contraseña. Lo haremos en el servicio
	// 6. Generar código de registro. Lo haremos en el servicio
	// 7. Insertar el usuario. Lo haremos en el servicio
	// 8. Enviar el mail de confirmación. Lo haremos en el servicio
	// 9. Enviar respuesta
	try {
		// Validar si hay datos
		await validateSchemaUtil(newUserSchema, req.body);

		// Recoger datos del body
		const { username, email, password } = req.body;

		// Llamar al service que registra al usuario
		const user = await registerUserService(username, email, password);

		res.status(201).send({
			status: 'ok',
			message: 'User registered, verify your email',
			data: user,
		});
	} catch (error) {
		next(error);
	}
};
