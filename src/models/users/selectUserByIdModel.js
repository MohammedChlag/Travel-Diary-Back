import { getPool } from "../../db/getPool.js";

export const selectUserByIdModel = async (id) => {
  // Tareas:
  // 1. Conectar con la base de datos
  // 2. Hacer la consulta con JOIN a entries y companions
  // 3. Devolver el usuario

  // Conectar con la base de datos
  const pool = await getPool();

  // Al hacer un select, el resultado es un array con 2 posiciones
  // La primera son los resultados. Es un array con tantas posiciones como registros haya encontrado.
  // La segunda es un array con información sobre la tabla
  const [user] = await pool.query(
    `
      SELECT 
        U.id, 
        U.username, 
        U.firstName, 
        U.lastName, 
        U.email, 
        U.avatar, 
        U.createdAt, 
        U.updatedAt,
        E.id AS entryId, 
        E.title AS entryTitle, 
        E.place AS entryPlace, 
        E.description AS entryDescription, 
        E.createdAt AS entryCreatedAt, 
        E.updatedAt AS entryUpdatedAt,
        C.id AS companionId, 
        C.username AS companionUsername, 
        C.firstName AS companionFirstName, 
        C.lastName AS companionLastName, 
        C.email AS companionEmail, 
        C.avatar AS companionAvatar, 
        C.createdAt AS companionCreatedAt, 
        C.updatedAt AS companionUpdatedAt
      FROM users U
      LEFT JOIN entries E ON U.id = E.userId
      LEFT JOIN usersEntriesCompanions UEC ON U.id = UEC.userId
      LEFT JOIN users C ON UEC.entryId = C.id
      WHERE U.id = ? AND U.active = 1
    `,
    [id]
  );

  // Como id es único, solo habrá un registro por lo que nos quedamos con la primera posición
  return user[0];
};
