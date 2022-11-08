import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from 'src/commons/pipes/joi.pipe';
import { ApiEmailBadRequest, ApiEmailBody, ApiEmailCreated, ApiEmailInternalServerError, ApiEmailOperation } from './api-docs/email.docs';
import { EmailBulkNotificationDTO, EmailNotificationDTO } from './dto/email.dto';
import { emailBulkNotificationSchema, emailNotificationSchema } from './email.pipe';
import { EmailService } from './email.service';

@ApiTags('Email')
@Controller('/api/email')
export class EmailController {
    constructor(private emailService: EmailService) {}

    @UsePipes(new JoiValidationPipe(emailNotificationSchema))
    @Post()
    @ApiEmailOperation()
    @ApiEmailBody(EmailNotificationDTO)
    @ApiEmailCreated(EmailNotificationDTO)
    @ApiEmailBadRequest(EmailNotificationDTO)
    @ApiEmailInternalServerError(EmailNotificationDTO)
    async emailNotificationController(@Body() emailNotificationDTO: EmailNotificationDTO) {
        return await this.emailService.emailNotification(emailNotificationDTO);
    }

    @UsePipes(new JoiValidationPipe(emailBulkNotificationSchema))
    @Get('/bulk')
    @ApiEmailOperation('bulk')
    @ApiEmailBody(EmailBulkNotificationDTO, 'bulk')
    async emailBulkNotificationController() {
        return await this.emailService.emailBulkNotification(EmailBulkNotificationDTO);
    }
}
