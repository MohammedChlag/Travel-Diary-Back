// Importar el módulo joi.
import joi from 'joi';

// Importar el módulo joiErrorMessages.
import { joiErrorMessages } from './joiErrorMessages.js';

// Esquema para validar imágenes.
// name: Es el nombre del archivo. Es una cadena y es requerido.
// mimetype: Es el tipo de archivo. Es una cadena, debe ser jpeg o png y es requerido.
// size: Es el tamaño del archivo. Es un número, debe ser menor a 5 MB y es requerido.
// unknown(true): Permite que el objeto tenga campos adicionales que no vamos a validar.
export const imgSchema = joi
	.object({
		name: joi.string().required().messages(joiErrorMessages),
		mimetype: joi
			.string()
			.valid('image/jpeg', 'image/png')
			.required()
			.messages(joiErrorMessages),
		size: joi.number().max(5000000).required().messages(joiErrorMessages),
	})
	.unknown(true);
