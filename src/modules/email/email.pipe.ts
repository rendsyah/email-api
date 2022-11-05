import * as Joi from "joi";
import { EmailNotificationDTO } from "./dto/email.dto";

const EmailNotificationSchema = Joi.object<EmailNotificationDTO>({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
});

export { EmailNotificationSchema };
