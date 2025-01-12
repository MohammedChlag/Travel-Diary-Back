import { editPasswordUserService } from "../../services/users/editPasswordUserService.js";
import { generateErrorUtils } from "../../utils/helpers.js";

export const editPasswordUserController = async (req, res, next) => {
    try {
        // Tareas:
        // Obtener el id del usuario desde req.user
        const { id } = req.user;
        // Obtener la info desde req.body
        const { oldPassword, newPassword, confirmPassword } = req.body;
        if (!oldPassword || !newPassword || !confirmPassword) {
            throw generateErrorUtils(400, 'REQUIRED_FIELDS_MISSING', 'Debes enviar todos los campos necesarios');            
        };
        // buscar el user en la base de datos
        const user = await editPasswordUserService(id, oldPassword, newPassword, confirmPassword);
        // Devolver la respuesta
        res.send({ status: 'ok', message: 'Contraseña actualizada correctamente', data: user });

    } catch (error) {
        next(error);
    }
};