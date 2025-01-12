import { newEntryService } from '../../services/entries/newEntryService.js';
import { newPhotosService } from '../../services/photos/newPhotosService.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';

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
		// const { id } = req.user;
		const userId = req.user.id;

		// 2. Obtener la info del body
		const { title, place, description } = req.body;

		// 3. Obtener las fotos del body
		// const photos = req.files; // Si lo hago así estoy guardando un objeto con las fotos
		const photos = Object.values(req.files); // Si lo hago así estoy guardando un array con las fotos

		// Permitimos 3 fotos como máximo
		if (photos.length > 3) {
			throw generateErrorUtils(
				400,
				'PHOTOS_LIMIT',
				'No puedes subir más de 3 fotos'
			);
		}
		// 6. Crear una entrada en la base de datos
		const entry = await newEntryService({
			userId,
			title,
			place,
			description,
		});

		// 7. Crear las fotos en la base de datos solo si hay fotos
		let photosResult = [];

		if (photos.length > 0) {
			photosResult = await newPhotosService(userId, entry.id, photos);
			if (photosResult.affectedRows === 0) {
				throw generateErrorUtils(
					500,
					'PHOTOS_NOT_CREATED',
					'No se han podido crear las fotos'
				);
			}
		}

		// 8. Responder con la entrada y las fotos creadas
		res.status(201).send({
			status: 'ok',
			data: {
				entry: {
					...entry,
					photos: photosResult,
				},
			},
		});
		// res.status(201).send('Listo');
	} catch (error) {
		next(error);
	}
};
