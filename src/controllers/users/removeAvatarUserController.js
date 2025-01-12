import { removeAvatarUserService } from "../../services/users/removeAvatarUserService.js";

export const removeAvatarUserController = async (req, res, next) => {
    try {
        const {id} = req.user;
        const user = await removeAvatarUserService(id)
        if (!user) {
            throw new Error('User not found');
        }
        res.status(201).send({status: 'ok', message:'User registered', data: {user}});
    } catch (error) {
        next(error);
    }
};