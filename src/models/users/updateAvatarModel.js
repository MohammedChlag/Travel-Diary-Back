import { getPool } from "../../db/getPool.js";

export const updateAvatarModel = async (id, avatar) => {

    // Query para actualizar la avatar en la BD
    const pool = await getPool()
    const result = await pool.query('UPDATE users SET avatar = ? WHERE id = ?', [avatar, id]);

    return result;
};
