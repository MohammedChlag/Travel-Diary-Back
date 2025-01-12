import { newUserSchema } from '../../schemas/users/newUserSchema.js';
import { registreUserServices } from '../../services/users/registerUserService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const registerUserController = async (req, res, next) => {
    try {
        // Validar los datos
        await validateSchemaUtil(newUserSchema, req.body);

        // Recoger los datos
        const { username, email, password } = req.body;

        // Llamar al service que registra al usuario
        const user = await registreUserServices(username, email, password);

        // Devuelve el user
        res.status(201).send({status: 'ok', message:'User registered', data: user});

    } catch (error) {
        next(error);
    }
};