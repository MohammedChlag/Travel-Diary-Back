import { loginUserSchema } from "../../schemas/users/loginUserSchema.js";
import { loginUserService } from "../../services/users/loginUserService.js";
import { generateErrorUtils } from "../../utils/helpers.js";
import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";

export const loginUserController = async (req, res, next) => {
    try {
        // Validar los datos
        await validateSchemaUtil(loginUserSchema, req.body)
        const { email, password } = req.body;

        // Llamar al servicio de login.
        const token = await loginUserService(email, password);

        // Devuelve el token
        res.status(200).send({ status: 'ok', message: 'Login exitoso', data: {token} });

    } catch (error) {
    next(error);
    }
};