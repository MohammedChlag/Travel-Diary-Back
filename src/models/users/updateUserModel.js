import { getPool } from "../../db/getPool.js";

export const updateUserModel = async (id, cleanUserInfo) => {

    // Query para actualizar los datos del usuario en la BD
    const pool = await getPool()
    const [result] = await pool.query('UPDATE users SET username =?, firstName =?, lastName =?, email =? WHERE id =?', [cleanUserInfo.username, cleanUserInfo.firstName, cleanUserInfo.lastName, cleanUserInfo.email, id]);

    return result;
};
