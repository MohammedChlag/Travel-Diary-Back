import { getPool } from '../../db/getPool.js';

export const insertVoteModel = async (id, userId, entryId, value) => {
	// Tareas:
	// 1. Conectar a la base de datos
	// 2. Insertar el voto
	// 3. Devolver el resultado

	// 1. Conectar a la base de datos
	const pool = await getPool();

	// 2. Insertar el voto
	const [result] = await pool.query(
		'INSERT INTO usersEntriesVotes (id, userId, entryId, value) VALUES (?, ?, ?, ?)',
		[id, userId, entryId, value]
	);

	// 3. Devolver el resultado
	return result;
};
