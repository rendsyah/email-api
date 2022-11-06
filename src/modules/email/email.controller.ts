import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/commons/pipes/joi.pipe';
import { EmailNotificationDTO } from './dto/email.dto';
import { emailNotificationSchema } from './email.pipe';
import { EmailService } from './email.service';

@Controller('/api/email')
export class EmailController {
    constructor(private emailService: EmailService) {}

    @UsePipes(new JoiValidationPipe(emailNotificationSchema))
    @Post()
    async emailNotificationController(@Body() emailNotificationDTO: EmailNotificationDTO) {
        return await this.emailService.emailNotification(emailNotificationDTO);
    }

    @Get('/bulk')
    async emailBulkNotificationController() {
        return await this.emailService.emailBulkNotification();
    }
}
