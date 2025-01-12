import { getAllEntriesService } from '../../services/entries/getAllEntriesService.js';

export const getAllEntriesController = async (req, res, next) => {
	// Tareas:
	// 1. Obtener todas las entradas de la base de datos. Lo va a hacer el Service
	// 2. Enviar las entradas al cliente

	try {
		const entries = await getAllEntriesService();

		res.status(200).send({
			status: 'Ok',
			message: 'Lista de entradas',
			data: { entries },
		});
	} catch (error) {
		next(error);
	}
};
