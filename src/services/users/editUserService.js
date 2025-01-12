import { selectUserByEmailModel } from "../../models/users/selectUserByEmailModel.js";
import { selectUserByUsernameModel } from "../../models/users/selectUserByUsernameModel.js";
import { updateUserModel } from "../../models/users/updateUserModel.js";
import { generateErrorUtils } from "../../utils/helpers.js";

export const editUserService = async (id, newUserInfo) => {

    // Limpiar los datos por si viene un undefined
    // Comprobar si el username y email ya existen en la base de datos y no son mios
    // Actualizar los datos del usuario
    // Devolver el usuario actualizado

    const cleanUserInfo = {
        username: newUserInfo.username,
        firstName: newUserInfo.firstName ?? null,
        lastName: newUserInfo.lastName ?? null,
        email: newUserInfo.email
    };
    const sameUsername = await selectUserByUsernameModel(cleanUserInfo.username);
    if (sameUsername && sameUsername.id !== id) {
        throw generateErrorUtils(400, 'USERNAME_ALREADY_EXISTS', 'El username ya existe');
    };
    const sameEmail = await selectUserByEmailModel(cleanUserInfo.email);
    if (sameEmail && sameEmail.id !== id) {
        throw generateErrorUtils(400, 'EMAIL_ALREADY_EXISTS', 'El email ya existe');
    };
    const result = await updateUserModel(id, cleanUserInfo);
    if (result.affectedRows !== 1) {
        throw generateErrorUtils(500, 'USER_NOT_UPDATED', 'No se pudo actualizar el usuario.');
    }
    return {id, ...cleanUserInfo};
};