import { generateErrorUtils } from './helpersUtils.js';
import jwt from 'jsonwebtoken';

export const checkExtractTokenUtils = (authorization) => {
	// Comprobar si el token empieza por Bearer
	if (!authorization.startsWith('Bearer')) {
		throw generateErrorUtils(
			401,
			'INVALID_TOKEN_FORMAT',
			'El formato del token es incorrecto'
		);
	}

	// Extraer el token
	const token = authorization.split(' ')[1];

	return token;
};

export const verifyTokenPayloadUtils = (token, secret) => {
	try {
		const payload = jwt.verify(token, secret);

		return payload;
	} catch (error) {
		throw generateErrorUtils(401, 'INVALID_TOKEN', 'El token no es válido');
	}
};
