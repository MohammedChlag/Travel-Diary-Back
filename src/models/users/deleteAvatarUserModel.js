import { getPool } from "../../db/getPool.js";

export const deleteAvatarUserModel = async (id) => {
    // Query para eliminar el avatar en la BD
    const pool = await getPool()
    const result = await pool.query('UPDATE users SET avatar = NULL WHERE id = ?', [id]);

    return result; 
};
