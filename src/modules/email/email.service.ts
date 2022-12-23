import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, SendMailOptions } from 'nodemailer';
import * as root from 'app-root-path';

import { EmailBulkNotificationDTO, EmailNotificationDTO } from './dto/email.dto';
import { IEmailMasterData, IEmailRequestData, IEmailTransporter } from './email.interface';
import { BaseFunctions } from 'src/commons/libs/base-function.service';
import { MongoService } from 'src/datasource/mongo/mongo.service';
import { PostgreService } from 'src/datasource/postgre/postgre.service';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class EmailService {
    private masterData: IEmailMasterData[] = [];

    constructor(
        private baseFunctions: BaseFunctions,
        private configService: ConfigService,
        private mongoModelsService: MongoService,
        private postgreModelsService: PostgreService,
    ) {}

    private async _emailMasterData() {
        // Check Master Data
        if (this.masterData.length === 0) {
            const getNotificationMessage = await this.postgreModelsService.findAllNotificationMessage({
                mediaId: 4,
                status: 1,
            });

            // Add Master Data
            if (getNotificationMessage.length > 0) {
                this.masterData.push(...getNotificationMessage);
            }
        }
    }

    private async _emailRequestData(params: IEmailRequestData) {
        // Get Entries & Attachment
        const getEntries = await this.postgreModelsService.findOneEntries({ id: params.entriesId });
        const getAttachment = await this.mongoModelsService.findOneAttachment(params);

        // Guard Entries & Attachment Data
        if (!getEntries || !getAttachment) {
            throw new NotFoundException('entries not found');
        }

        // Mapping Entries
        const entriesEventId = 1;
        const entriesMediaId = 4;
        const entriesTicketId = 1;
        const entriesName = 'Filza';
        const entriesEmail = 'rendy_milan@hotmail.com';
        const entriesFilename = `${root}/../public/test.jpeg`;
        const entriesIsValid = 2;
        const entriesRcvdTime = '2022-11-10 00:00:00';

        // Get Event, Ticket & Message
        const getEvent = await this.postgreModelsService;
        const getTicket = await this.postgreModelsService;
        const getMessage = this.masterData.find((v) => {
            return v.media_id === entriesMediaId && v.event_id === entriesEventId && v.is_valid === entriesIsValid;
        });

        // Guard Event
        if (!getEvent) {
            throw new NotFoundException('event not found');
        }
        // Guard Ticket
        if (!getTicket) {
            throw new NotFoundException('ticket event not found');
        }
        // Guard Message
        if (!getMessage) {
            throw new NotFoundException('message event not found ');
        }

        // Mapping Event
        const eventName = 'Gelora Pestapora';
        const eventStartDate = '2022-11-07 00:00:00';
        const eventEndDate = '2022-11-10 00:00:00';

        // Mapping Ticket
        const ticketPrice = '20000';

        // Mapping Message
        let replaceMessage = [];
        if (replaceMessage.length === 0) {
            replaceMessage.push(entriesName, eventStartDate, eventEndDate);
        }

        // Mapping Request Email
        const messageEmail = this.baseFunctions.validateReplaceMessage(getMessage?.message, replaceMessage);
        const subjectEmail = this.baseFunctions.validateString(getMessage?.subject, 'char');
        const pathEmail = this.baseFunctions.validateFilename(entriesFilename);
        const sentTimeEmail = this.baseFunctions.validateTime(new Date(), 'datetime');

        // Mapping Response Data
        const responseMappingData = {
            to: entriesEmail,
            message: messageEmail,
            subject: subjectEmail,
            filename: entriesFilename,
            path: pathEmail,
            mediaId: entriesMediaId,
            eventId: entriesEventId,
            sentTime: sentTimeEmail,
        };

        return responseMappingData;
    }

    private async _emailTransporter(params: IEmailTransporter) {
        const { service, user, pass, to, text, subject, filename, path } = params;

        // Create Transporter
        const transporter = createTransport({
            service: service,
            from: user,
            pool: true,
            auth: {
                user: user,
                pass: pass,
            },
        });

        // Options Transporter
        const options: SendMailOptions = {
            to: to,
            text: text,
            subject: subject,
            attachments: [
                {
                    filename: filename,
                    path: `${root}/..${path}`,
                    content: '',
                },
            ],
            html: '',
        };

        // Sending Email
        transporter.sendMail(options, (error) => {
            if (error) {
                throw error;
            }
        });

        return transporter;
    }

    public async emailNotification(params: EmailNotificationDTO) {
        // Call Master Data
        // await this._emailMasterData();

        // Get Data Configuration & Data Email
        const serviceTransporter = this.configService.get('EMAIL_SERVICE');
        const userTransporter = this.configService.get('EMAIL_USER');
        const passTransporter = this.configService.get('EMAIL_PASS');

        const object: any = {};

        object.map((v) => {
            v.asdf = v;
        });

        // const emailRequestData: any = await this._emailRequestData({ ...params });

        // Insert Outgoing Log
        // const createdLogOutgoing = await this.mongoModelsService.createdLogOutgoing({
        //     from: userTransporter,
        //     to: emailRequestData.to,
        //     message: '',
        //     attachment: '',
        //     sentTime: '',
        //     mediaId: emailRequestData.mediaId,
        //     eventId: emailRequestData.eventId,
        //     status: 'pending',
        //     isAck: 0,
        // });

        // Mapping Data Email
        // const requestTransporter = {
        //     service: serviceTransporter,
        //     user: userTransporter,
        //     pass: passTransporter,
        //     to: emailRequestData.to,
        //     text: emailRequestData.message,
        //     subject: emailRequestData.subject,
        //     filename: emailRequestData.filename,
        //     path: emailRequestData.path,
        // };

        // Sending Email
        // await this._emailTransporter(requestTransporter);

        // Update Outgoing Log
        // await this.mongoModelsService.updateOneLogOutgoing({
        //     id: createdLogOutgoing.id,
        //     message: emailRequestData.message,
        //     attachment: emailRequestData.path,
        //     sentTime: emailRequestData.sentTime,
        //     status: 'sent',
        //     isAck: 1,
        // });

        return 'ok';
    }

    public async emailBulkNotification(params: EmailBulkNotificationDTO) {
        return;
    }
}
