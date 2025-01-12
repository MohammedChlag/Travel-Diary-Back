import { getPool } from "../../db/getPool.js";

export const updatePasswordModel = async (id, newHashedPassword) => {
    
    const pool = await getPool();
    const [result] = await pool.query(`UPDATE users SET password = ? where id = ?;`,
                                        [newHashedPassword, id]
                                     );
    
    return result;
};
