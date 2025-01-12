import { getPool } from '../../db/getPool.js';

export const selectPhotosByEntryIdModel = async (entryId) => {
	// Tareas:
	// 1. Obtener la conexion con la base de datos
	// 2. Realizar la consulta para obtener todas las fotos de una entrada
	// 3. Devolver las fotos

	// 1. Obtener la conexion con la base de datos
	const pool = await getPool();

	// 2. Realizar la consulta para obtener todas las fotos de una entrada
	const [photos] = await pool.query(`SELECT * FROM photos WHERE entryId = ?`, [
		entryId,
	]);

	// 3. Devolver las fotos
	return photos;
};
