import { getPool } from "../../db/getPool.js";

export const selectUserByIdModel = async (id) => {
  // Tareas:
  // 1. Conectar con la base de datos
  // 2. Hacer la consulta
  // 3. Devolver el usuario

  // Conectar con la base de datos
  const pool = await getPool();

  // Al hacer un select, el resultado es un array con 2 posiciones
  // La primera son los resultados. Es un array con tantas posiciones como registros haya encontrado.
  // La segunda es un array con información sobre la tabla
  const [results] = await pool.query(
    `
		SELECT 
			u.id, 
			u.email, 
			u.password, 
			u.firstName, 
			u.lastName, 
			u.role, 
			u.avatar, 
			u.createdAt,
			JSON_ARRAYAGG(
				JSON_OBJECT(
					'id', e.id,
					'title', e.title,
					'description', e.description,
					'place', e.place,
					'createdAt', e.createdAt
				)
			) as entries
		FROM users u
		LEFT JOIN entries e ON u.id = e.userId
		WHERE u.id = ? AND u.active = 1
		GROUP BY u.id`,
    [id]
  );

  // Como id es único, solo habrá un registro por lo que nos quedamos con la primera posición
  return results[0];
};
