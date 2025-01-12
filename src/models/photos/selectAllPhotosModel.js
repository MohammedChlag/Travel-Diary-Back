import { getPool } from '../../db/getPool.js';

export const selectAllPhotosModel = async () => {
	// Tareas:
	// 1. Obtener la conexion con la base de datos
	// 2. Realizar la consulta para obtener todas las fotos
	// 3. Devolver las fotos

	// 1. Obtener la conexion con la base de datos
	const pool = await getPool();

	// 2. Realizar la consulta para obtener todas las fotos
	const [photos] = await pool.query(`SELECT * FROM photos`);

	// 3. Devolver las fotos
	return photos;
};
