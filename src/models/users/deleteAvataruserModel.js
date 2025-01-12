import { getPool } from '../../db/getPool.js';

export const deleteAvataruserModel = async (id) => {
	// Tareas:
	// 1. Conectar con la base de datos
	// 2. Hacer la consulta
	// 3. Devolver el resultado

	// Conectar con la base de datos
	const pool = await getPool();

	// Al hacer un delete, el resultado es un array en el que la primera posición es un objeto con información sobre la eliminación
	const [result] = await pool.query(
		`UPDATE users SET avatar = NULL WHERE id = ?;`,
		[id]
	);

	return result;
};
