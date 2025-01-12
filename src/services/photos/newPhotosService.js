import path from 'path';
import crypto from 'crypto';
import { savePhotoUtil } from '../../utils/photoUtils.js';
import { insertPhotoModel } from '../../models/photos/insertPhotoModel.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';

export const newPhotosService = async (userId, entryId, photos) => {
	// Crear un array para almacenar los resultados de cada foto procesada
	const processedPhotos = [];

	// Crear el path relativo donde se guardarán las fotos
	// const photosRelativePath = `src/uploads/entries/${userId}/${entryId}`;
	const photosRelativePath = path.join('src/uploads/entries', userId, entryId);

	for (const photo of photos) {
		// 1. Generar un ID único para la foto
		const photoId = crypto.randomUUID();

		// 2. Guardar la foto en el sistema de archivos
		const photoName = await savePhotoUtil(photosRelativePath, photo, 800);

		// 3. Guardar la información de la foto en la base de datos
		const result = await insertPhotoModel(photoId, entryId, photoName);

		// Si no se pudo insertar la foto en la base de datos, lanzar un error
		if (result.affectedRows !== 1) {
			throw generateErrorUtils(
				500,
				'PHOTO_NOT_SAVED',
				'No se ha podido guardar la foto en la base de datos'
			);
		}

		// Agregar la información de la foto procesada al array
		processedPhotos.push({
			id: photoId,
			photoName,
			entryId,
		});
	}

	// Devolver la lista de fotos procesadas
	return processedPhotos;
};
