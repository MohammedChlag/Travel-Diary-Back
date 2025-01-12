import bcrypt from "bcrypt";

import { generateErrorUtils } from "../../utils/helpers.js";
import { selectUserByIdModel } from "../../models/users/selectUserByIdModel.js";
import { updatePasswordModel } from "../../models/users/updatePasswordModel.js";

export const editPasswordUserService = async (id, oldPassword, newPassword, confirmPassword) => {

    // Tareas:
    // 1. Validar que el usuario exista
    const user = await selectUserByIdModel(id);
    // 2. Validar que el password actual sea correcto
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw generateErrorUtils(401, 'INVALID_PASSWORD', 'Contraseña incorrecta');
    };
    // 3. Validar que el nuevo password y confirmar password sean iguales
    if (newPassword!== confirmPassword) {
        throw generateErrorUtils(400, 'PASSWORDS_NOT_MATCH', 'Las contraseñas no coinciden');
    };
    if (newPassword === oldPassword) {
        throw generateErrorUtils(400, 'PASSWORD_SAME_AS_OLD', 'La nueva contraseña es igual a la anterior');
    };
    // 4. Encriptar el nuevo password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    // 5. Actualizar el password del usuario
    const result = await updatePasswordModel(id, newHashedPassword);
    if (result.affectedRows !== 1) {
		throw generateErrorUtils(500, 'ERROR_DB', 'No se pudo actualizar la contraseña.');
	};
    // 7. Borrar el password del objeto user para devolver solo los datos necesarios
    delete user.password;
    // 6. Devolver un mensaje de confirmación
    return result;
};
