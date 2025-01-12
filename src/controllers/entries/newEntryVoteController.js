import { newEntryVoteService } from '../../services/entries/newEntryVoteService.js';

export const newEntryVoteController = async (req, res, next) => {
	// Tareas:
	// 1. Obtener los datos necesarios
	// 2. Realizar la votación
	// 3. Responder con la entrada actualizada
	try {
		// 1, Obtener los datos necesarios
		const { id: userId } = req.user;
		const { id: entryId } = req.entry;
		const { value } = req.body;

		// 2. Realizar la votación
		const entry = await newEntryVoteService(userId, entryId, value);

		// 3. Responder con la entrada actualizada
		res.status(200).send({
			status: 'OK',
			message: 'Votación realizada con éxito',
			data: { entry },
		});
	} catch (error) {
		next(error);
	}
};
