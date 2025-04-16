import express from "express";
import morgan from "morgan";
import fileupload from "express-fileupload";
import cors from "cors";
import path from "path";

import { router } from "./routes/indexRouter.js";

import { UPLOADS_DIR } from "../env.js";
import { generateErrorUtils } from "./utils/helpersUtils.js";

export const server = express();

/* MIDLEWARES */
// Estan disponibles para todas las rutas. Tienen que ir antes de las rutas
server.use(morgan("dev")); // En morgan se puede poner: 'dev', 'combined', 'tiny', 'short', 'common'. Si me debería de dar 200 y da 304 es porque está en caché y le respuesta no ha cambiado
server.use(express.json()); // Para transformar el JSON que viene en el body de la petición a un objeto de JavaScript
server.use(fileupload()); // Prepara mi server para recibir archivos en las peticiones a traves del body
const uploadsDir = path.join(process.cwd(), `src/${UPLOADS_DIR}`); // Para definir la ruta donde se subirán los archivos
server.use("/uploads", express.static(uploadsDir)); // Para definir esa ruta como directorio estático donde se subirán los archivos
server.use(cors()); // Para permitir peticiones desde cualquier origen

/* ROUTERS */
server.use(router);

/* ERRORES */
// Ruta no encontrada
server.use((req, res, next) => {
  next(
    generateErrorUtils(
      404,
      "ROUTE_NOT_FOUND",
      `No se encontró la ruta: ${req.originalUrl}`
    )
  );
});

//Gestor de errores
server.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    httpStatus: error.httpStatus || 500,
    code: error.code || "INTERNAL_SERVER_ERROR",
    message: error.message,
  });
});
