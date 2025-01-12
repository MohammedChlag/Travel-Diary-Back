import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { selectUserByEmailModel } from "../../models/users/selectUserByEmailModel.js";
import { generateErrorUtils } from "../../utils/helpers.js";

import { SECRET } from "../../../env.js";

export const loginUserService = async (email,password) => {

    // Buscar el usuario por email
    const user = await selectUserByEmailModel(email)

    // Comprobar si la contraseña es correcta
    let isValidPassword = false;

    if(user){
        // Comprobar la contraseña
        isValidPassword = await bcrypt.compare(password, user.password);
    }

    // Lanzar error si no hay usuario o la contraseña no es correcta
    if(!user || !isValidPassword){
        throw generateErrorUtils(401, 'INVALID_CREDENTIALS', 'Credenciales inválidas');
    }

    // Lanzar error si el usuario no está activo
    if(!user.active){
        throw generateErrorUtils(403, 'USER_NOT_ACTIVE', 'El usuario no está activo');
    }

    // Generar el token
    const payload = {
        id: user.id,
        role: user.role
    };
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

    // Devolver el token
    return token;    
};