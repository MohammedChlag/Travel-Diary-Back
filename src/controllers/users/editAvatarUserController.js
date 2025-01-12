import { editAvatarSchema } from "../../schemas/users/editAvatarSchema.js";
import { editAvatarUserService } from "../../services/users/editAvatarUserService.js";
import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";

export const editAvatarUserController = async (req, res, next) => {
    try {
        // Recoger el id del usuario sino existe lanzar error
        const { id } = req.user

        // validar la foto
        await validateSchemaUtil(editAvatarSchema, req.files || {})

        // Recuperar el archivo de la peticion
        const { avatar } = req.files;

        // Llamar al service
        // Actualizar el avatar en la base de datos
        // Guardar el avatar en el sistema de archivos
        const user = await editAvatarUserService(id, avatar)

        // Devolver el user actualizado
        res.status(200).send({ status: 'ok', message: 'Avatar updated', data: {user} });
    } catch (error) {
    next(error);
    }
};