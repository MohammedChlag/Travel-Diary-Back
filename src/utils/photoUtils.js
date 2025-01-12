import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';

import { generateErrorUtils } from './helpersUtils.js';
import { createPathUtil } from './foldersUtils.js';

// Función para guardar una foto. Debe recibi: type(avatar, entry), image, width, name
export const savePhotoUtil = async (userRelativePath, image, width) => {
	// Crear el directorio
	await createPathUtil(path.join(process.cwd(), userRelativePath));

	// Nombre de la foto
	const avatarName = `${crypto.randomUUID()}.jpg`; // Nombre de 36 caracteres aleatorios + 4 de la extensión

	// Ruta de la foto
	const avatarPath = path.join(process.cwd(), userRelativePath, avatarName);

	const imgSharp = sharp(image.data); // Crear un objeto sharp con la imagen
	imgSharp.resize(width); // Redimensionar la imagen
	imgSharp.jpeg({ quality: 100 }); // Convertir la imagen a jpeg con calidad 90. El valor por defecto 80
	await imgSharp.toFile(avatarPath); // Guardar la imagen

	// Lo mismo que las tres líneas anteriores en una sola línea
	// await sharp(image.data).resize(width).toFile(avatarPath);

	console.log('Imagen guardada en: ', avatarPath);

	return avatarName;
};

// Función para borrar una foto. Debe recibir: path
export const deletePhotoUtil = async (avatarPath) => {
	// Borrar la foto
	await fs.unlink(avatarPath, (error) => {
		if (error) {
			throw generateErrorUtils(
				500,
				'DELETE_PHOTO_ERROR',
				`No se ha podido borrar la foto: ${avatarPath}`
			);
		}
	});

	console.log(`Borrado correctamente la foto: ${avatarPath}`);
};
