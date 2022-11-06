import { Injectable } from '@nestjs/common';
import { createTransport, SendMailOptions } from 'nodemailer';
import { path } from 'app-root-path';
import { EmailNotificationDTO } from './dto/email.dto';
import { BaseFunctions } from 'src/commons/libs/base-function.service';
import { MongoService } from 'src/datasource/mongo/mongo.service';
import { ConfigService } from '@nestjs/config';
import { PostgreService } from 'src/datasource/postgre/postgre.service';
import { IMasterData } from './email.interface';

@Injectable()
export class EmailService {
    private masterData: IMasterData[] = [];
    private mongoModels: MongoService;
    private postgreModels: PostgreService;

    constructor(
        private baseFunctions: BaseFunctions,
        private configService: ConfigService,
        private mongoService: MongoService,
        private postgreService: PostgreService,
    ) {
        this.mongoModels = this.mongoService;
        this.postgreModels = this.postgreService;
    }

    private async _emailTransporter() {
        if (this.masterData.length === 0) {
            const getNotificationMessage = await this.postgreModels.findAllNotificationMessage({
                mediaId: 4,
                status: 1,
            });
            if (getNotificationMessage.length > 0) {
                this.masterData.push(...getNotificationMessage);
            }
        }

        const transporter = createTransport({
            service: this.configService.get('EMAIL_SERVICE'),
            from: this.configService.get('EMAIL_USER'),
            pool: true,
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
        const emailEvent = this.configService.get('EMAIL_USER');
        const getMessageEvent = this.masterData.find((v) => v.media_id === mediaId && v.event_id === eventId);
        const messageEvent = this.baseFunctions.validateReplaceMessage(getMessageEvent?.message, [
            name,
            'Gebyar Pestapora',
            '2022-11-06 21:00:20',
            'Gebyar Pestapora',
            '2022-11-16 17:00:00',
            '2022-11-29 20:00:00',
        ]);

        const subjectEvent = this.baseFunctions.validateString(getMessageEvent?.subject, 'char');
        const attachmentEvent = this.baseFunctions.validateString(attachment, 'decode');
        const sentTimeEvent = this.baseFunctions.validateTime(new Date(), 'datetime');

        if (!messageEvent || !sentTimeEvent) {
            throw new Error('push email failed');
        }

        const createdLogOutgoing = await this.mongoModels.createdLogOutgoing({
            from: emailEvent,
            to: email,
            message: '',
            attachment: '',
            sentTime: '',
            mediaId: mediaId,
            eventId: eventId,
            status: 'pending',
        });

        const options: SendMailOptions = {
            to: email,
            text: messageEvent,
            subject: subjectEvent,
            attachments: [
                {
                    filename: 'Qr-Code.jpg',
                    path: `${path}/template/BG-Dumbways.jpg`,
                },
            ],
            html: '',
        };

        transporter.sendMail(options, (error) => {
            if (error) {
                throw error;
            }
        });

        await this.mongoModels.updateOneLogOutgoing({
            id: createdLogOutgoing.id,
            message: messageEvent,
            attachment: attachmentEvent,
            sentTime: sentTimeEvent,
            status: 'sent',
            isAck: 1,
        });

        return 'ok';
    }

    public async emailBulkNotification() {
        return;
    }
}
