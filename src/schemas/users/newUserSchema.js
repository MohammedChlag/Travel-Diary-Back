import joi from 'joi';

import { joiErrorMessages } from '../joiErrorMessages.js';

export const newUserSchema = joi.object({
	username: joi.string().min(3).max(50).required().messages(joiErrorMessages),
	email: joi.string().email().required().messages(joiErrorMessages),
	password: joi
		.string()
		.pattern(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
		)
		.required()
		.messages(joiErrorMessages),
});

// ^ y $:
// ^ asegura que la coincidencia comience al inicio del string.
// $ asegura que la coincidencia termine al final del string.

// (?=.*\d): (?=...) es un lookahead positivo que verifica si el string contiene al menos un dígito (\d). Esto asegura que la contraseña tenga al menos un número.

// (?=.*[a-z]): Verifica si hay al menos una letra minúscula ([a-z]).
// (?=.*[A-Z]): Verifica si hay al menos una letra mayúscula ([A-Z]).

// (?=.* [@¡!$ %^&* ()_ +| ~=\`{}: ";'<>¿?,.]):Verifica si hay al menos un símbolo especial de entre los permitidos.

// [a - zA - Z0 - 9@¡!$ %^&* ()_ +| ~=\`{}: ";'<>¿?,.]: Define el conjunto permitido de caracteres en la contraseña: Letras minúsculas (a-z), letras mayúsculas (A-Z), números (0-9), y los caracteres especiales.

// { 8,}: asegura que la contraseña tenga al menos 8 caracteres.
