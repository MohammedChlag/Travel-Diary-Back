import { getPool } from "../../db/getPool.js";

export const selectUserByRegistrationCodeModel = async (registrationCode) => {
    
    const pool = await getPool()
    
    // Query a la BD para buscar por RegistrationCode
    const [user] = await pool.query('SELECT * FROM users WHERE registrationCode =?', [registrationCode]);
    
    return user[0];
};
