import { removeEntryPhotosService } from "../../services/photos/removeEntryPhotosService.js";
import { generateErrorUtils } from "../../utils/helpers.js";

export const removeEntryPhotosController = async (req, res, next) => {
    try {
        // 1. Obtener la entrada de req.entry
        const entry = req.entry;

        // 2. Obtener las fotos a eliminar desde el body
        const { photoIds } = req.body;

        // 3. Comprobar si se han proporcionado IDs de fotos
        if (!photoIds || !Array.isArray(photoIds) || photoIds.length === 0) {
            throw generateErrorUtils(400, 'DATA_MISSING', 'No se han proporcionado IDs de fotos');
        }

        // 4. Llamar al servicio para eliminar las fotos
        await removeEntryPhotosService(entry, entry.id, photoIds);

        // 5. Responder al cliente
        res.status(200).send({
            status: 'Ok',
            message: 'Fotos eliminadas correctamente',
        });
    } catch (error) {
        next(error);
    }
};