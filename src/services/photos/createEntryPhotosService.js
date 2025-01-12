import crypto from 'crypto';
import path from 'path';

import { generateErrorUtils } from "../../utils/helpers.js";
import { savePhotoUtil } from "../../utils/PhotoUtil.js";
import { insertPhotoModel } from "../../models/photos/insertPhotoModel.js" 

export const createEntryPhotosService = async (userId, photos, entryId) => {
    // Crear un array para almacenar los resultados de cada foto procesada
    const photosResults = [];
    // Crear el path relativo de las fotos para guardarlas
    const photosRelativePath = path.join('src/uploads/entries',userId,entryId)

    for (const photo of photos) {
        // Generar un ID único para la foto
        const photoId = crypto.randomUUID()
        // Guardar la foto en el sistema de archivos
        const photoName = await savePhotoUtil(photosRelativePath, photo, 600);

        // Guardar la información de la foto en la base de datos
        const photoResult = await insertPhotoModel(photoId, photoName, entryId);
        // Si no se pudo insertar la foto en la base de datos, lanzar un error
        if (photoResult.affectedRows !== 1) {
            throw generateErrorUtils(500, 'ERROR_CREATING_PHOTOS', 'Error al crear las fotos'); 
        };
        // Agregar la información de la foto procesada al array
        photosResults.push({id: photoId, photoName, entryId});
    };

    return photosResults;
};