import express from 'express';
import morgan from 'morgan';
import fileupload from "express-fileupload"
import path from "path";

import { indexRouter } from './routes/indexRoutes.js';

export const server = express();

// Middleware
server.use(morgan('dev')); // En morgan se puede poner: 'dev','combined','tiny', 'short', 'common', 'json... si me da 200 o 304 es porque esta en caché y la respuesta no ha cambiado
server.use(express.json());

server.use(fileupload());
const uploadDir = path.join(process.cwd(), './src/uploads');
server.use('/uploads', express.static(uploadDir));



// Routers
server.use(indexRouter);


// Errores
// Ruta no encontrada
server.use((req, res, next) => {
    const resourcePath = req.path 
    const error = new Error(`No se encontró el recurso: ${resourcePath} `);
    error.status = 404;
    error.code = 'RESOURCE_NOT_FOUND';
    next(error);
});

// Gestor de errores
server.use((error, req, res, next) => {
    console.error(error);
    res.status(error.httpStatus || 500).send({
        httpStatus: error.httpStatus || 500,
        status: 'ERROR!!',
        code: error.code || 'INTERNAL_SERVER_ERROR',
        message: error.message
    });
});
