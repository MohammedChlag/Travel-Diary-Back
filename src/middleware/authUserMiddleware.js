import { generateErrorUtils } from "../utils/helpers.js";
import { checkExtractTokenUtil, verifyTokenPayloadUtil } from "../utils/tokenUtils.js";
import { SECRET } from "../../env.js";

export const authUserMiddleware = async (req, res, next) => {
    try {
        // Recoger el token
        
        const {authorization} = req.headers
        
        // Comprobar el token sino lo hay lanzar error
        if (!authorization) {
            throw generateErrorUtils(401, 'AUTH_TOKEN_REQUIRED', 'Debes enviar un token de autenticación');
        }

        // Comprobar si el token empieza por 'Bearer' y extraer el token        
        const token = checkExtractTokenUtil(authorization);

        // Recuperar el payload del token        
        const payload = verifyTokenPayloadUtil(token, SECRET);

        // Guardar el payload en req.user
        req.user = payload;

        // Continuar con la petición
        next();
    } catch (error) {
        next(error);
    }
};