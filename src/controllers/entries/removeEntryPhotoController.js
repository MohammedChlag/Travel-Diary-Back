import { deletePhotoByIdModel } from "../../models/photos/deletePhotoByIdModel.js";

export const removeEntryPhotosController = async (req, res, next) => {
  try {
    const { photoId } = req.params;

    await deletePhotoByIdModel(photoId);

    res.status(200).send({
      success: true,
      status: "ok",
      message: "Imagen eliminada con éxito",
    });
  } catch (error) {
    next(error);
  }
};
