import { getPool } from "../../db/getPool.js";

export const selectUserByIdModel = async (id) => {
   
        const pool = await getPool();

        // Query a la BD para buscar por id
        const [user] = await pool.query('SELECT id, email, password, username, firstName, lastName, role, avatar,createdAt, updatedAt  FROM users WHERE id = ?', [id]);

        return user[0];
};
