import { getPool } from '../../db/getPool.js';

export const selectAllEntriesModel = async () => {
	// Tareas:
	// 1. Obtener la conexion con la base de datos
	// 2. Realizar la consulta para obtener todas las entradas
	// 3. Devolver las entradas

	// 1. Obtener la conexion con la base de datos
	const pool = await getPool();

	// 2. Realizar la consulta para obtener todas las entradas
	const [entries] = await pool.query(
		`SELECT E.*, ROUND(IFNULL(AVG(UEV.value), 0), 2) AS averageVote, IFNULL(COUNT(UEV.id), 0) AS votesCount
    FROM entries E
    LEFT JOIN usersEntriesVotes UEV ON E.id = UEV.entryId
    GROUP BY E.id`
	);

	// 3. Devolver las entradas
	return entries;
};
