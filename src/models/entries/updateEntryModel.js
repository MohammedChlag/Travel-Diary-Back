import { getPool } from '../../db/getPool.js';

export const updateEntryModel = async (entry) => {
	// Tareas:
	// 1. Obtener la conexión con la base de datos
	// 2. Realizar la consulta
	// 3. Devolver el resultado

	// 1. Obtener la conexión con la base de datos
	const pool = await getPool();

	// 2. Realizar la consulta
	const [result] = await pool.query(
		`UPDATE entries SET title = ?, place = ?, description = ? WHERE id = ?`,
		[entry.title, entry.place, entry.description, entry.id]
	);

	// 3. Devolver el resultado
	return result;
};
