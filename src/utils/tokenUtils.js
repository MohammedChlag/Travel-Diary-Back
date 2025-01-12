import jwt from "jsonwebtoken";

import { generateErrorUtils } from "./helpers.js"


export const checkExtractTokenUtil = (authorization)=>{
    if (!authorization.startsWith('Bearer')) {
        throw generateErrorUtils(401, 'INVALID_AUTH_HEADER', 'La cabecera de autenticación no tiene el formato correcto');
    }

    const token = authorization.split(' ')[1];

    return token;
}

export const verifyTokenPayloadUtil = (token, secret)=>{
    try {
        const payload = jwt.verify(token, secret)
        
        return payload;
    } catch (error) {
        throw generateErrorUtils(401,'INVALID_TOKEN','Token invalido')
    }
}