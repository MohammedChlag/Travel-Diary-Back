import { editUserService } from "../../services/users/editUserService.js";
import { generateErrorUtils } from "../../utils/helpers.js";

export const editUserController = async (req, res, next) => {
    try {
     // Recoger los datos del usuario a editar
     const { id } = req.user;
     // Obtener los datos desde req.body
     const newUserInfo = req.body;
     if (!newUserInfo) {
        throw generateErrorUtils(400,'INFO_MISSING','No se han enviado datos a modificar.')
     }
     if (!newUserInfo.username || !newUserInfo.email) {
        throw generateErrorUtils(400,'INFO_MISSING','Faltan datos obligatorios.')        
     }
     // llama al service que actualiza el usuario
     const user = await editUserService(id, newUserInfo);
     // Devuelve el usuario actualizado
     res.status(200).send({ status: 'ok', message: 'Usuario actualizado', data: user });
     
    } catch (error) {
     next(error);
    }
};