import { generateErrorUtils } from "../../utils/helpers.js";

import { newEntryService } from "../../services/entries/newEntryService.js";
import { createEntryPhotosService } from "../../services/photos/createEntryPhotosService.js";

export const newEntryController = async (req, res, next) => {
	// Tareas:
	// 1. Obtener el id del usuario
	// 2. Obtener la info del body
	// 3. Obtener las fotos del body. Permitimos 3 fotos como máximo
	// 4. Validar la info del body Esto lo hará JOI. Si hay errores, devolver un error
	// 5. Validar las fotos. Esto lo hará JOI. Si hay errores, devolver un error
	// 6. Crear una entrada en la base de datos. Lo harán los servicios. Si hay errores, devolver un error
	// 7. Crear las fotos en la base de datos. Lo harán los servicios. Si hay errores, devolver un error
	// 8. Responder con la entrada y las fotos creadas. data debe ser un objeto con entry y photos
    try {
        // 1. Obtener el id del usuario
        const userId = req.user.id;

        // 2. Obtener la info del body
        const { title, place, description } = req.body;

        // 3. Obtener las fotos del body. Permitimos 3 fotos como máximo
        const photos = Object.values(req.files);
        if (photos.length > 3) {
            throw generateErrorUtils(
                400,
                'TOO_MANY_PHOTOS',
                'No puedes subir más de 3 fotos'
            );
        }

        // 6. Crear una entrada en la base de datos. Lo harán los servicios. Si hay errores, devolver un error
		const entry = await newEntryService({
			userId,
			title,
			place,
			description,
		});
        // 7. Crear las fotos en la base de datos solo si hay fotos
        let photosResults = [];
          
        if (photos.length > 0) {
            photosResults = await createEntryPhotosService(userId, photos, entry.id);
            if (photosResults.affectedRows === 0) {
				throw generateErrorUtils(
					500,
					'PHOTOS_NOT_CREATED',
					'No se han podido crear las fotos'
				);
			}
        };
        // 8. Responder con la entrada y las fotos creadas
        res.status(201).send({ status: 'ok', message: 'Entrada creada correctamente', data:{ entry:{...entry, photos: photosResults}}});

    } catch (error) {
        next(error);
    }
};