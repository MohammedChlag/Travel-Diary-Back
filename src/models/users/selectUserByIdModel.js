import { getPool } from "../../db/getPool.js";

export const selectUserByIdModel = async (id) => {
  // Conectar a la base de datos
  const pool = await getPool();

  // Realizar la consulta para obtener el usuario
  const [user] = await pool.query(
    `SELECT * FROM users WHERE id = ? AND active = 1`,
    [id]
  );

  // Si no existe el usuario, devolver null
  if (!user[0]) return null;

  // Realizar la consulta para obtener las entradas del usuario
  const [entries] = await pool.query(
    `
    SELECT E.*, U.username, 
    U.avatar, ROUND(IFNULL(AVG(UEV.value), 0), 2) AS averageVote, IFNULL(COUNT(UEV.id), 0) AS votesCount
    FROM entries E
    LEFT JOIN usersEntriesVotes UEV ON E.id = UEV.entryId
		LEFT JOIN users U ON E.userId = U.id
    GROUP BY E.id
		ORDER BY E.createdAt DESC
    `,
    [user[0].id]
  );

  // Realizar la consulta para obtener las fotos de cada entrada
  const entriesWithPhotos = await Promise.all(
    entries.map(async (entry) => {
      const [photos] = await pool.query(
        `SELECT * FROM photos WHERE entryId = ?`,
        [entry.id]
      );
      return { ...entry, photos };
    })
  );

  // Realizar la consulta para obtener los compañeros del usuario
  const [companions] = await pool.query(
    `SELECT U.id, U.username, U.firstName, U.lastName, U.avatar 
    FROM usersEntriesCompanions UEC
    LEFT JOIN users U ON UEC.userId = U.id
    WHERE UEC.entryId IN (
      SELECT id
      FROM entries E
      WHERE E.userId = ?
    )
    ORDER BY U.createdAt DESC`,
    [user[0].id]
  );

  // Devolver el usuario con sus entradas y compañeros
  return { ...user[0], entries: entriesWithPhotos, companions };
};
