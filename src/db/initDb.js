import path from "path";
import { getPool } from "./getPool.js";
import { MYSQL_DATABASE, UPLOADS_DIR } from "../../env.js";
import { createPathUtil, deletePathUtil } from "../utils/foldersUtils.js";

export const initDb = async () => {
    try {
        // Obtener pool de conexiones
        const pool = await getPool();

        // Poner la base de datos en uso
        console.log('🚀 Poniendo en uso la DDBB...');
        await pool.query(`USE ${MYSQL_DATABASE}`);
        console.log('🔛 DDBB en uso');

        // Borrar las tablas si existen
        console.log('🧹 Barriendo las tablas...');
        await pool.query(`DROP TABLE IF EXISTS photos, usersEntriesVotes, entries, users`);
        console.log('👋 Tablas barridas');

        // Crear las tablas
        console.log('🛠️  Creando tablas...');
        await pool.query(`
            CREATE TABLE users (
                id CHAR(50) PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                firstName VARCHAR(50),
                lastName VARCHAR(50),
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(60) NOT NULL,
                avatar CHAR(50) DEFAULT NULL,
                active BOOLEAN DEFAULT FALSE,
                role ENUM('admin', 'user') DEFAULT 'user',
                registrationCode CHAR(15) DEFAULT NULL,
                recoveryPassCode CHAR(15) DEFAULT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
            );
        `);
        await pool.query(`
            CREATE TABLE entries (
                id CHAR(50) PRIMARY KEY,
                title VARCHAR(50) NOT NULL,
                place VARCHAR(30) NOT NULL,
                description TEXT NOT NULL,
                userId CHAR(50) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            );
        `);
        await pool.query(`
            CREATE TABLE usersEntriesVotes (
                id CHAR(50) PRIMARY KEY ,
                value TINYINT UNSIGNED NOT NULL,
                userId CHAR(50) NOT NULL,
                entryId CHAR(50) NOT NULL,
                UNIQUE(userId, entryId),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (entryId) REFERENCES entries(id) ON DELETE CASCADE
            );
        `);
        await pool.query(`
            CREATE TABLE photos (
                id CHAR(50) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                entryId CHAR(50) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (entryId) REFERENCES entries(id) ON DELETE CASCADE
            );
        `);
        console.log('✅ Tablas creadas correctamente');

        // Gestionar directorios
        const uploadsPath = path.join(process.cwd(), `src/${UPLOADS_DIR}`);

        console.log('🗑️  Borrando directorio uploads...');
        await deletePathUtil(uploadsPath);
        console.log('🧼 Directorios borrados');

        console.log('📂 Creando directorio uploads...');
        await createPathUtil(uploadsPath);
        console.log('🗂️  Directorio uploads creado');

        const avatarPath = path.join(uploadsPath, 'avatars');
        console.log('📸 Creando directorio avatars...');
        await createPathUtil(avatarPath);
        console.log('✅ Directorio avatars creado');

        const entriesPath = path.join(uploadsPath, 'entries');
        console.log('📝 Creando directorio entries...');
        await createPathUtil(entriesPath);
        console.log('✅ Directorio entries creado');

        console.log('🎉 Todo ha salido bien. Base de datos inicializada con éxito.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error durante la inicialización de la base de datos:', error);
        process.exit(1);
    }
};

initDb();