import { getPool } from "../../db/getPool.js";

export const insertPhotoModel = async (photoId, photoName, entryId) => {
    const pool = await getPool();
    const [result] = await pool.query('INSERT INTO photos (id, name, entryId) VALUES (?, ?, ?)', [photoId, photoName, entryId]);
    return result;
};