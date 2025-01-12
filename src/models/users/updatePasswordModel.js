import { getPool } from '../../db/getPool.js';

export const updatePasswordModel = async (id, password) => {
	// Tareas:
	// 1. Conectar con la base de datos
	// 2. Realizar la consulta
	// 3. Devolver el resultado

	// 1. Conectar con la base de datos
	const pool = await getPool();

	// 2. Realizar la consulta
	const [result] = await pool.query(
		`UPDATE users SET password = ? WHERE id = ?`,
		[password, id]
	);

	// 3. Devolver el resultado
	return result;
};
