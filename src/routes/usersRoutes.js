import express from 'express';

import { selectAllUsersController } from '../controllers/users/getAllUsersController.js';
import { registerUserController } from '../controllers/users/registerUserController.js';
import { activeUsersController } from '../controllers/users/activeUsersController.js';
import { loginUserController } from '../controllers/users/loginUserController.js';
import { authUserMiddleware } from '../middleware/authUserMiddleware.js';
import { getOwnUsersController } from '../controllers/users/getOwnUsersController.js';
import { editAvatarUserController } from '../controllers/users/editAvatarUserController.js';
import { removeAvatarUserController } from '../controllers/users/removeAvatarUserController.js';
import { editPasswordUserController } from '../controllers/users/editPasswordUserController.js';
import { editUserController } from '../controllers/users/editUserController.js';
import { editPasswordByRecoveryController } from '../controllers/users/editPasswordByRecoveryController.js';
import { sendRecoverPassController } from '../controllers/users/sendRecoverPassController.js';

export const usersRouter = express.Router();

usersRouter.get('/users' , selectAllUsersController);
// usersRouter.get('/users/:id' , selectUsersByIdController)
usersRouter.post('/users/register', registerUserController);
usersRouter.put('/users/active/:registrationCode', activeUsersController);
usersRouter.post('/users/login', loginUserController);
usersRouter.get('/users/own',authUserMiddleware, getOwnUsersController);
usersRouter.put('/users/avatar', authUserMiddleware, editAvatarUserController);
usersRouter.delete('/users/avatar',authUserMiddleware, removeAvatarUserController);
usersRouter.put('/users/password', authUserMiddleware, editPasswordUserController);
usersRouter.put('/users/own',authUserMiddleware, editUserController);
usersRouter.post('/users/password/recover', sendRecoverPassController); // Ruta para recuperar la contraseña de un usuario
usersRouter.put('/users/password/recover', editPasswordByRecoveryController); // Ruta para cambiar la contraseña de un usuario recuperada