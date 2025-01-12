import { getPool } from '../../db/getPool.js';

export const insertPhotoModel = async (photoId, entryId, photoName) => {
	// Tareas:
	// 1. Crear la conexión a la base de datos
	// 2. Insertar la foto en la base de datos
	// 3. Devolver la foto creada

	// 1. Crear la conexión a la base de datos
	const pool = await getPool();
	const [result] = await pool.query(
		`
        INSERT INTO photos (id, name, entryId)
        VALUES (?, ?, ?)
    `,
		[photoId, photoName, entryId]
	);

	return result;
};
