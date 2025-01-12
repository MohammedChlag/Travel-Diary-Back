import crypto from 'crypto';
import { generateErrorUtils } from '../../utils/helpers.js';
import { insertNewEntryModel } from '../../models/entries/insertNewEntryModel.js';

export const newEntryService = async (entry) => {

    // Tareas:
    // 1. Crear el id de la entry con crypto.RandomUUID()
    const id = crypto.randomUUID();
    // 2. Crear la entrada en la base de datos, lo hará el Model
    const resut = await insertNewEntryModel({id,...entry})
    if (resut.affectedRows !== 1) {
        throw generateErrorUtils(500, 'ERROR_CREATING_ENTRY', 'Error al crear la entrada');             
    }
    
    // 3. Devuelve la entry creada
    return {id,...entry};
};