import { getPool } from '../../db/getPool.js';

export const updateRecoveryPassCodeModel = async (id, recoveryPassCode) => {
	// Tareas:
	// 1. Obtener la conexión a la base de datos
	// 2. Actualizar el recoveryPassCode en el usuario
	// 3. Devolver el resultado

	// 1. Obtener la conexión a la base de datos
	const pool = await getPool();

	// 2. Actualizar el recoveryPassCode en el usuario
	const [result] = await pool.query(
		`
    UPDATE users
    SET recoveryPassCode = ?
    WHERE id = ?
  `,
		[recoveryPassCode, id]
	);

	// 3. Devolver el resultado
	return result;
};
