import { getPool } from '../../db/getPool.js';

export const updateUserModel = async (id, info) => {
	// Tareas:
	// 1. Conectar con la base de datos
	// 2. Realizar la consulta
	// 3. Devolver el resultado

	// Conectar con la base de datos
	const pool = await getPool();

	// Realizar la consulta
	const [result] = await pool.query(
		`UPDATE users SET username = ?, firstName = ?, lastName = ?, email = ? WHERE id = ?`,
		[info.username, info.firstName, info.lastName, info.email, id]
	);

	// Devolver el resultado
	return result;
};
