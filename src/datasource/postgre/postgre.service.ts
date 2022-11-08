import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFindAllNotificationMessage } from './interfaces/notification-message';
import { IFindOneEntries } from './interfaces/entries';
import { NotificationMessage } from './models/notification-message.entity';
import { Entries } from './models/entries.entity';

@Injectable()
export class PostgreService {
    constructor(
        @InjectRepository(NotificationMessage) private readonly notificationMessageModel: Repository<NotificationMessage>,
        @InjectRepository(Entries) private readonly entriesModel: Repository<Entries>,
    ) {}

    public async findAllNotificationMessage(params: IFindAllNotificationMessage) {
        return await this.notificationMessageModel.find({ where: { ...params } });
    }

    public async findOneEntries(params: IFindOneEntries) {
        return await this.entriesModel.findOne({ where: { ...params } });
    }
}
