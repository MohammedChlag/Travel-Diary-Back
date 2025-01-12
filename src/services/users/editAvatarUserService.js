import path from "path"
import { selectUserByIdModel } from "../../models/users/selectUserByIdModel.js";
import { updateAvatarModel } from "../../models/users/updateAvatarModel.js";
import { deleteAvatarUtil, savePhotoUtil } from "../../utils/PhotoUtil.js";

export const editAvatarUserService = async (id, avatar) => {

    // Buscar el user por id
    const user = await selectUserByIdModel(id);
    // Crear el Path relativo del archivo
    const userRelativePath = `src/uploads/avatars/${id}`
    // Guardar imagen en la carpeta
    // Crear un nombre unico para el archivo
    // Processar la imagen
    const imgName = await savePhotoUtil(userRelativePath, avatar,200)
    // Si ya tenia avatar borrarlo de la carpeta
    if(user.avatar){
        const avatarPath = path.join(process.cwd(), userRelativePath, user.avatar)
        await deleteAvatarUtil(avatarPath)
    }
    // Guardar el avatar en el sistema de archivos
    // Actualizar el avatar en la base de datos
    const result = await updateAvatarModel(id, imgName)
    if (result.affectedRows === 0) {
        throw generateErrorUtils(404, 'ERROR_UPDATING', 'Error al actualizar el avatar');     
    }
    // borrar el password
    delete user.password
    // Devolver el user actualizado
    return {...user, avatar: imgName}
}