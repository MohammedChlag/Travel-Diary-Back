import { createEntryPhotosService } from '../../services/photos/createEntryPhotosService.js';
import { generateErrorUtils } from '../../utils/helpers.js';

export const newEntryPhotosController = async (req, res, next) => {
	// Tareas:
	// 1. Obtener la entrada de req.entry
	// 2. Obtener las fotos de req.files
	try {
		// 1. Obtener la entrada de req.entry
		const entry = req.entry;

		// 2. Obtener las fotos de req.files
		if (!req.files) {
			throw generateErrorUtils(400, 'DATA_MISSING', 'No se han enviado fotos');
		}
		const photos = Object.values(req.files);

		// 3. Comprobar si se pueden añadir las fotos ya que el usuario no puede tener más de 3 fotos por entrada
		if (entry.photos.length + photos.length > 3) {
			throw generateErrorUtils(
				400,
				'LIMIT_EXCEEDED',
				'No puede haber más de 3 fotos por entrada'
			);
		}

		// 4. Añadir las fotos a la entrada
		const photosResults = await createEntryPhotosService(
			entry.userId,
			photos,
			entry.id
		);

		// 5. Responder al cliente
		res.status(201).send({
			status: 'Ok',
			message: 'Fotos añadidas',
			data: {
				entry: {
					...entry,
					photos: [...entry.photos, ...photosResults],
				},
			},
		});
	} catch (error) {
		next(error);
	}
};
