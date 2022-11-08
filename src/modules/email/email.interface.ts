import { NotificationMessage } from 'src/datasource/postgre/models/notification-message.entity';

export interface IEmailMasterData extends NotificationMessage {}

export interface IEmailRequestData {
    entriesId: number;
}

export interface IEmailTransporter {
    service: string;
    user: string;
    pass: string;
    to: string;
    text: string;
    subject: string;
    filename: string;
    path: string;
}

export interface IEmailReturnMappingData {}
