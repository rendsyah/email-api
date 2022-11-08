import * as Joi from 'joi';
import { EmailNotificationDTO } from './dto/email.dto';

const emailNotificationSchema = Joi.object<EmailNotificationDTO>({
    entriesId: Joi.number().required(),
});

export { emailNotificationSchema };
