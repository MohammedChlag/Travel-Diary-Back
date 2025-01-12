import { activateUserServices } from "../../services/users/activateUserServices.js";
import { generateErrorUtils } from "../../utils/helpers.js";

export const activeUsersController = async (req, res, next) => {
   try {
      
      const {registrationCode} = req.params;

      // Validar si hay datos
      if (!registrationCode) {
         throw generateErrorUtils(400,'REGISTRATION_CODE_MISSING','El codigo de registration es obligatorio');
      }

      // Llamar al service que activa el usuario con el codigo de registro
      const user = await activateUserServices(registrationCode);

      // Enviar la respuesta
      res.status(200).send({status: 'ok', message:'User activated', data: user});
      
   } catch (error) {
      next(error);
   }
};