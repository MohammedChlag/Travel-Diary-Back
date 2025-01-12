import { getPool } from '../../db/getPool.js';

export const updatePasswordByRecoveryModel = async (id, password) => {
	// Tareas:
	// 1. Obtener la conexión
	// 2. Realizar la consulta
	// 3. Devolver el resultado

	// 1. Obtener la conexión
	const pool = await getPool();

	// 2. Realizar la consulta
	const [result] = await pool.query(
		`UPDATE users SET password = ?, recoveryPassCode = NULL WHERE id = ?`,
		[password, id]
	);

	// 3. Devolver el resultado
	return result;
};
