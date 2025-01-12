import { getPool } from '../../db/getPool.js';

export const selectAllusersModel = async () => {
	// Tareas:
	// 1. Obtener la conexion con la base de datos
	// 2. Realizar la consulta para obtener todos los usuarios
	// 3. Devolver los usuarios

	// 1. Obtener la conexion con la base de datos
	const pool = await getPool();

	// 2. Realizar la consulta para obtener todos los usuarios
	const [users] = await pool.query(
		'SELECT id, username, firstName, lastName, email, avatar, createdAt, updatedAt FROM users'
	);

	// 3. Devolver los usuarios
	return users;
};
