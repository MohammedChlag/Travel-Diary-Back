import { ownUserService } from "../../services/users/ownUserService.js";
import { generateErrorUtils } from "../../utils/helpers.js";

export const getOwnUsersController = async (req, res, next) => {
    try {
        // Recoger el id del usuario sino existe lanzar error
        const {id} = req.user
        if (!id) {
            throw generateErrorUtils(401, 'USER_ID_MISSING', 'No se ha encontrado la id del usuario');            
        }

        // Buscar el usuario en la base de datos sino existe lanza error
        const user = await ownUserService(id);
        if (!user) {
            throw generateErrorUtils(404, 'USER_NOT_FOUND', 'El usuario no existe');
        }

        // Devolver el usuario
        res.status(200).send({status: 'ok', message:'User found', data: user} );  
        
    } catch (error) {
        next(error);
    }
};