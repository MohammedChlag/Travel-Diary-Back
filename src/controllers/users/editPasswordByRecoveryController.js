import { editPasswordBYRecoveryService } from "../../services/users/editPasswordBYRecoveryService.js";

export const editPasswordByRecoveryController = async (req, res, next) => {
  // Tareas:
  // 1. Recuperar el email, el recoveryPassCode, la nueva contraseña y la confirmación de la nueva contraseña del body
  // 2. Buscar el usuario por email. Lo haremos con el servicio. Si no se ha encontrado, lanzar un error
  // 3. Comprobar que el recoveryPassCode es correcto. Lo haremos con el servicio. Si no es correcto, lanzar un error
  // 4. Comprobar que newPassword y newPasswordConfirm son iguales. Lo haremos con el servicio. Si no son iguales, lanzar un error
  try {
    // 1. Recuperar el email, el recoveryPassCode, la nueva contraseña y la confirmación de la nueva contraseña del body
    const { email, recoveryPassCode, newPassword, newPasswordConfirm } =
      req.body;

    // 2. Buscar el usuario por email.
    const user = await editPasswordBYRecoveryService(
      email,
      recoveryPassCode,
      newPassword,
      newPasswordConfirm
    );
    res.status(200).send({
      status: "ok",
      message: "La contraseña se ha actualizado correctamente",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
