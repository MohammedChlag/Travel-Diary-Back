import path from 'path';

import { deletePhotoByIdModel } from '../../models/photos/deletePhotoByIdModel.js';
import { selectPhotosByEntryIdModel } from '../../models/photos/selectPhotosByEntryIdModel.js';
import { generateErrorUtils } from '../../utils/helpers.js';
import { deleteAvatarUtil } from '../../utils/PhotoUtil.js';

export const removeEntryPhotosService = async (entry, entryId, photoIds) => {
    // 1. Obtener las fotos actuales de la entrada para poder eliminar del sistema de archivos
    const photos = await selectPhotosByEntryIdModel(entryId);
    
    // 2. Comprobar si las fotos existen
    if (!photos || photos.length === 0) {
        throw generateErrorUtils(404, 'NO_PHOTOS_FOUND', 'No se encontraron fotos para esta entrada');
    }

    // 3. Crear un array para almacenar las nombres de las fotos a eliminar
    const photosToDelete = photos.filter(photo => photoIds.includes(photo.id));

    // 4. Comprobar si hay fotos a eliminar
    if (photosToDelete.length === 0) {
        throw generateErrorUtils(404, 'PHOTOS_NOT_FOUND', 'No se encontraron fotos para eliminar con los IDs proporcionados');
    }

    // 5. Eliminar las fotos de la base de datos
    const result = await deletePhotoByIdModel(photoIds);

    // 6. Comprobar si se eliminaron las fotos correctamente
    if (result.affectedRows === 0) {
        throw generateErrorUtils(500, 'ERROR_DELETING_PHOTOS', 'Error al eliminar las fotos de la base de datos');
    }

    // 7. Eliminar las fotos del sistema de archivos
    for (const photo of photosToDelete) {
        const photoPath = path.join(process.cwd(), 'src/uploads/entries',entry.userId, entryId, photo.name);
        await deleteAvatarUtil(photoPath);
    }

    // 8. Devolver un mensaje de éxito
    return { message: 'Fotos eliminadas correctamente' };
};