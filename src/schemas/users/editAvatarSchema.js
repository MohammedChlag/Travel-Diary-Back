import joi from 'joi';

import { imgSchema } from '../imgSchema.js';
import { joiErrorMessages } from '../joiErrorMessages.js';

export const editAvatarSchema = joi.object({
	avatar: imgSchema.required().messages(joiErrorMessages),
});
