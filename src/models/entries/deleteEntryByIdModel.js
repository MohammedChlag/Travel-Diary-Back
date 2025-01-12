import { getPool } from '../../db/getPool.js';

export const deleteEntryByIdModel = async (id) => {
	// Tareas:
	// 1. Obtener la conexión con la base de datos
	// 2. Ejecutar la consulta
	// 3. Devolver el resultado

	// 1. Obtener la conexión con la base de datos
	const pool = await getPool();

	// 2. Ejecutar la consulta
	const [result] = await pool.query(
		`
    DELETE FROM entries
    WHERE id = ?
  `,
		[id]
	);

	return result;
};
