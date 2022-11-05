import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { JoiValidationPipe } from "src/commons/pipes/joi.pipe";
import { EmailNotificationDTO } from "./dto/email.dto";
import { EmailNotificationSchema } from "./email.pipe";
import { EmailService } from "./email.service";

@Controller("/api/email")
export class EmailController {
    constructor(private emailService: EmailService) {}

    @UsePipes(new JoiValidationPipe(EmailNotificationSchema))
    @Post()
    async emailNotification(@Body() emailNotificationDTO: EmailNotificationDTO) {
        return await this.emailService.emailNotification(emailNotificationDTO);
    }
}
