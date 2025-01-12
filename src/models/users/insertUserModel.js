import { getPool } from '../../db/getPool.js';

export const insertUserModel = async (user) => {
	// Tareas:
	// 1. Conectar con la base de datos
	// 2. Hacer la consulta
	// 3. Enviar el mail de confirmación
	// 4. Devolver el resultado

	// Conectar con la base de datos
	const pool = await getPool();

	const { id, username, email, password, registrationCode } = user;

	// Al hacer un insert, el resultado es un array en el que la primera posición es un objeto con información sobre la inserción
	const [result] = await pool.query(
		`INSERT INTO users (id, username, email, password, registrationCode) VALUES (?, ?, ?, ?, ?);`,
		[id, username, email, password, registrationCode]
	);

	return result;
};
