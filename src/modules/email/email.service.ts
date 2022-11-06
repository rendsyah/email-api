import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailNotificationDTO } from './dto/email.dto';
import { BaseFunctions } from 'src/commons/libs/function.service';
import { LogService } from 'src/datasource/log/log.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    private masterText: string[] = [];
    private logModel: LogService;

    constructor(private baseFunctions: BaseFunctions, private configService: ConfigService, private LogService: LogService) {
        this.logModel = this.LogService;
    }

    private async _emailTransporter() {
        if (this.masterText.length === 0) {
            this.masterText.push('asdasd');
        }

        const transporter = nodemailer.createTransport({
            service: this.configService.get('EMAIL_SERVICE'),
            from: this.configService.get('EMAIL_USER'),
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_PASS'),
            },
        });

        return transporter;
    }

    public async emailNotification(params: EmailNotificationDTO) {
        const { name, email, attachment, eventId, mediaId } = params;

        const transporter = await this._emailTransporter();
        const createdOutgoingLog = await this.logModel.createdOutgoingLog({
            from: this.configService.get('EMAIL_USER'),
            to: email,
            message: 'numpang tes kakak',
            attachment: attachment,
            sentTime: this.baseFunctions.validateTime(new Date(), 'datetime'),
            mediaId: mediaId,
            eventId: eventId,
            status: 'pending',
        });

        const options = {
            to: email,
            text: `Hello ${name} test`,
            subject: this.configService.get('EMAIL_SUBJECT'),
            // attachments: [
            //     {
            //         filename: "",
            //         content: "",
            //         path: "",
            //     },
            // ],
        };

        transporter.sendMail(options, (error) => {
            if (error) {
                throw new Error(error.message);
            }
        });

        await this.logModel.updateOutgoingLog({ id: createdOutgoingLog.id, status: 'sent', isAck: 1 });
        return 'ok';
    }

    public async emailBulkNotification() {
        return;
    }
}
