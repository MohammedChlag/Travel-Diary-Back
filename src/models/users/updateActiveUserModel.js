import { getPool } from '../../db/getPool.js';

export const updateActiveUserModel = async (registrationCode) => {
	// Tareas:
	// 1. Conectar con la base de datos
	// 2. Hacer la consulta
	// 3. Devolver el usuario

	// Conectar con la base de datos
	const pool = await getPool();

	// Actualizar el usuario
	const [result] = await pool.query(
		`UPDATE users SET active = 1 WHERE registrationCode = ?;`,
		[registrationCode]
	);

	return result;
};
