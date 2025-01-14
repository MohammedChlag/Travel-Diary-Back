import { getPool } from '../../db/getPool.js';

export const insertCompanionModel = async (id, entryId, userId) => {
	// Tareas:
	// 1. Obtener la conexión con la base de datos
	// 2. Insertar los compañeros en la base de datos
	// 3. Devolver los compañeros insertados

	// 1. Obtener la conexión con la base de datos
	const pool = await getPool();

	// 2. Insertar los compañeros en la base de datos
	const [result] = await pool.query(
		'INSERT INTO usersEntriesCompanions (id, entryId, userId) VALUES (?, ?, ?)',
		[id, entryId, userId]
	);

	// 3. Devolver los compañeros insertados
	return result;
};
