import express from 'express';
import { getAllUsersController } from '../controllers/users/getAllUsersController.js';
import { registerUserController } from '../controllers/users/registerUserController.js';
import { loginUserController } from '../controllers/users/loginUserController.js';
import { activeUserController } from '../controllers/users/activeUserController.js';
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { getOwnUserController } from '../controllers/users/getOwnUserController.js';
import { editAvatarUserController } from '../controllers/users/editAvatarUserController.js';
import { removeAvatarUserController } from '../controllers/users/removeAvatarUserController.js';
import { editUserController } from '../controllers/users/editUserController.js';
import { editPasswordUserController } from '../controllers/users/editPasswordUserController.js';
import { sendRecoverPassController } from '../controllers/users/sendRecoverPassController.js';
import { editPasswordByRecoveryController } from '../controllers/users/editPasswordByRecoveryController.js';

export const usersRouter = express.Router();

usersRouter.get('/users', getAllUsersController);
// usersRouter.get('/users/:id', selectUsersByIdController);
usersRouter.post('/users/register', registerUserController); // Ruta para registrar un usuario
usersRouter.put('/users/active/:registrationCode', activeUserController); // Ruta para activar un usuario
usersRouter.post('/users/login', loginUserController); // Ruta para loguear un usuario
usersRouter.get('/users/own', authUserMiddleware, getOwnUserController); // Ruta para obtener los datos de tu propio usuario
usersRouter.put('/users/avatar', authUserMiddleware, editAvatarUserController); // Ruta para actualizar el avatar de tu usuario
usersRouter.delete(
	'/users/avatar',
	authUserMiddleware,
	removeAvatarUserController
); // Ruta para borrar el avatar de tu usuario
usersRouter.put('/users/own', authUserMiddleware, editUserController); // Ruta para actualizar los datos de tu usuario
usersRouter.put(
	'/users/password',
	authUserMiddleware,
	editPasswordUserController
); // Ruta para actualizar la contraseña de tu usuario

usersRouter.post('/users/password/recover', sendRecoverPassController); // Ruta para recuperar la contraseña de un usuario
usersRouter.put('/users/password/recover', editPasswordByRecoveryController); // Ruta para cambiar la contraseña de un usuario recuperada
