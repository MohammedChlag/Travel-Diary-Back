import path from "path";
import crypto from "crypto";
import sharp from "sharp";
import fs from "fs/promises";

import { createPathUtil } from "./foldersUtils.js"
import { generateErrorUtils } from "./helpers.js";

export const savePhotoUtil = async (userRelativePath,image,width)=>{
    // Implementacion de la funcionalidad para guardar la imagen en el path especificado
    // Crear la carpeta si no existe
    await createPathUtil(path.join(process.cwd(),userRelativePath))

    // Generar un nombre unico para el archivo
    const name = `${crypto.randomUUID()}.jpg`
    const photoPath = path.join(process.cwd(), userRelativePath, name)

    // Redimensionar la imagen para que tenga el ancho especificado
    const imgSharp = sharp(image.data)
    imgSharp.resize(width)
    imgSharp.jpeg({quality:100})
    // Guardar el archivo en el path especificado
    await imgSharp.toFile(photoPath)

    // Devolver el nombre del archivo guardado
    return name;
}

export const deleteAvatarUtil = async (path)=>{

    await fs.unlink(path,(error)=>{
        if(error){
            throw generateErrorUtils(500,'DELETE_PHOTO_ERROR','Error al borrar la imagen')
        }
    })

    console.log('Avatar eliminado');
    
}