import { getPool } from '../../db/getPool.js';

export const selectCompanionsByUserIdModel = async (id) => {
	// Tareas:
	// 1. Conectar a la base de datos
	// 2. Seleccionar los compañeros del usuario
	// 3. Devolver los compañeros del usuario

	// 1. Conectar a la base de datos
	const pool = await getPool();

	console.log('User Logged id', id);

	// 2. Seleccionar los compañeros del usuario
	const [companions] = await pool.query(
		`SELECT DISTINCT U.id, U.username, U.firstName, U.lastName, U.avatar, U.createdAt
    FROM usersEntriesCompanions UEC
    LEFT JOIN users U ON UEC.userId = U.id
    WHERE UEC.entryId IN (
      SELECT id
      FROM entries E
      WHERE E.userId = ?
    )
    ORDER BY U.createdAt DESC`,
		[id]
	);

	console.log('Select User Companions Model', companions);

	// 3. Devolver los compañeros del usuario
	return companions;
};
