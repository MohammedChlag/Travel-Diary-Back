import { getPool } from '../../db/getPool.js';

export const insertEntryModel = async (entry) => {
	// Tareas:
	// 1. Crear la conexión a la base de datos
	// 2. Insertar la entrada en la base de datos
	// 3. Devolver la entrada creada y el resultado de la inserción

	// 1. Crear la conexión a la base de datos
	const pool = await getPool();

	// 2. Crear una entrada en la base de datos
	const [result] = await pool.query(
		`INSERT INTO entries (id, title, place, description, userId )
    VALUES (?, ?, ?, ?, ?)`,
		[entry.id, entry.title, entry.place, entry.description, entry.userId]
	);

	// 3. Devolver la entrada creada
	return result;
};
