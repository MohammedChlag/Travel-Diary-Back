
export const getEntryByIdController = async (req, res, next) => {
	// Tareas:
	// 1. Obtener la entry de la request
	// 2. Responder con la entrada

	try {
		const entry = req.entry;

		res.status(200).send({
			status: 'Ok',
			message: 'Entrada encontrada',
			data: { entry },
		});
	} catch (error) {
		next(error);
	}
};
