import { selectUserByIdModel } from "../../models/users/selectUserByIdModel.js";
import { generateErrorUtils } from "../../utils/helpers.js";

export const ownUserService = async (id) => {

    // Buscar el usuario en la base de datos
    const user = await selectUserByIdModel(id);
    if (!user) {
        throw generateErrorUtils(404, 'USER_NOT_FOUND', 'El usuario no existe');        
    }
    
    // Devolver el usuario
    return user;
};