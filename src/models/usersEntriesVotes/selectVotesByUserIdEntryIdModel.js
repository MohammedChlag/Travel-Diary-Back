import { getPool } from '../../db/getPool.js';

export const selectVotesByUserIdEntryIdModel = async (userId, entryId) => {
	// Tareas:
	// 1. Conectar a la base de datos
	// 2. Realizar la consulta
	// 3. Devolver el resultado

	// 1. Conectar a la base de datos
	const pool = await getPool();

	// 2. Realizar la consulta
	const [vote] = await pool.query(
		'SELECT value FROM usersEntriesVotes WHERE userId = ? AND entryId = ?',
		[userId, entryId]
	);

	// 3. Devolver el resultado
	return vote[0];
};
