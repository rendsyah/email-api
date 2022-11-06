import * as Joi from 'joi';
import { EmailNotificationDTO } from './dto/email.dto';

const EmailNotificationSchema = Joi.object<EmailNotificationDTO>({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    attachment: Joi.string().allow(''),
    mediaId: Joi.number().required(),
    eventId: Joi.number().required(),
});

export { EmailNotificationSchema };
