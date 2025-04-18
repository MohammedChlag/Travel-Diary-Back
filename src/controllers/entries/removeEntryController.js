import { removeEntryService } from "../../services/entries/removeEntryService.js";

export const removeEntryController = async (req, res, next) => {
  // Tareas:
  // 1. Obtener la id de la entry a borrar
  // 2. Borrar la entry. Lo va a hacer el servicio. Si hay errores, lanzar el error
  // 3. Responder al cliente
  try {
    // 1. Obtener la id de la entry a borrar
    const entry = req.entry;

    // 2. Borrar la entry
    await removeEntryService(entry);

    // 3. Responder al cliente
    res.status(200).send({
      succes: true,
      status: "ok",
      message: "Entrada eliminada",
    });
  } catch (error) {
    next(error);
  }
};
