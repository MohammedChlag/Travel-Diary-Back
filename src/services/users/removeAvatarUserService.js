import path from "path"
import { deleteAvatarUserModel } from "../../models/users/deleteAvatarUserModel.js";
import { selectUserByIdModel } from "../../models/users/selectUserByIdModel.js";
import { generateErrorUtils } from "../../utils/helpers.js";
import { deleteAvatarUtil } from "../../utils/PhotoUtil.js";

export const removeAvatarUserService = async (id) => {
    const user = await selectUserByIdModel(id);
    if (!user.avatar) {
        throw generateErrorUtils(400,'USER_HAS_NOT_AVATAR','El usuario no tiene avatar')
    }
    const result = await deleteAvatarUserModel(id)
    if (result.affectedRows === 0) {
        throw generateErrorUtils(500, 'INTERNAL_SERVER_ERROR', 'Error al eliminar el avatar');
    }
    const userRelativePath = `src/uploads/avatars/${id}`
    const avatarPath = path.join(process.cwd(),userRelativePath, user.avatar)
    await deleteAvatarUtil(avatarPath)
    // Borramos la password
    delete user.password
    // Devolvemos el usuario actualizado con avatar eliminado
    return {...user, avatar: null}
};
