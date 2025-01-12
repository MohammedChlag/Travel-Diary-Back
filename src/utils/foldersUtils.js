import fs from 'fs/promises';
import path from 'path';
import { generateErrorUtils } from './helpers.js';

export const createPathUtil = async (path)=>{
    try {
        // Comprobar si la carpeta existe
        await fs.access(path)
        console.log(`El directorio ${path} ya existe.`)
    } catch (error) {
    if(error.code === 'ENOENT'){
        /* console.log(`No existe el directorio ${path}`); */
        /* console.log(`Creando el directorio...`); */
        // Crear la carpeta
        await fs.mkdir(path, {recursive: true});
        /* console.log(`Directorio ${path} creado con éxito.`); */
        } else{
            throw generateErrorUtils(500,'INTERNAL_SERVER_ERROR','Error al crear la carpeta')
        }
    }
}
export const deletePathUtil = async (path)=>{
    try {
        // Comprobar si la carpeta existe
        await fs.access(path)
        /* console.log(`El directorio ${path} existe.`); */
        // Borrar la carpeta
        await fs.rm(path, {recursive: true});
        /* console.log(`Directorio ${path} eliminado con éxito.`); */
    } catch (error) {
        if(error.code === 'ENOENT'){
            console.log(`No existe el directorio ${path}`);
        } else{
            throw generateErrorUtils(500,'INTERNAL_SERVER_ERROR','Error al eliminar la carpeta')
        }
    }
}