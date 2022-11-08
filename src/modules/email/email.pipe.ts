import * as Joi from 'joi';
import { EmailBulkNotificationDTO, EmailNotificationDTO } from './dto/email.dto';

export const emailNotificationSchema = Joi.object<EmailNotificationDTO>({
    entriesId: Joi.number().required(),
});

export const emailBulkNotificationSchema = Joi.object<EmailBulkNotificationDTO>({});
