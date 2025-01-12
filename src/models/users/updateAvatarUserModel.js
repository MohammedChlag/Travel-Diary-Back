import { getPool } from '../../db/getPool.js';

export const updateAvatarUserModel = async (id, avatarRelativePath) => {
	// Obtener el pool de conexiones
	const pool = await getPool();

	// Actualizar el avatar del usuario en la base de datos
	const [result] = await pool.query(
		`
      UPDATE users
      SET avatar = ?
      WHERE id = ?
    `,
		[avatarRelativePath, id]
	);

	return result;
};
