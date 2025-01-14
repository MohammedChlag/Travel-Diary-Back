import { getPool } from '../../db/getPool.js';

export const selectCompanionsByEntryIdModel = async (entryId) => {
	// Tareas:
	// 1. Conectar a la base de datos
	// 2. Seleccionar los compañeros de la entrada
	// 3. Devolver los compañeros de la entrada

	// 1. Conectar a la base de datos
	const pool = await getPool();

	// 2. Seleccionar los compañeros de la entrada
	const [companions] = await pool.query(
		`SELECT UEC.userId, U.username, U.firstName, U.lastName, U.avatar 
		FROM usersEntriesCompanions UEC
		LEFT JOIN users U ON UEC.userId = U.id
		WHERE entryId = ? `,
		[entryId]
	);

	console.log('Select Model companions', companions);

	// 3. Devolver los compañeros de la entrada
	return companions;
};
