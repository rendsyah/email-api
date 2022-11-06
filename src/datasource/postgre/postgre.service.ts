import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFindOneEvent } from './interfaces/event';
import { IFindAllNotificationMessage } from './interfaces/notification-message';
import { IFindOneTransaction } from './interfaces/transaction';
import { NotificationMessage } from './models/notification-message.entity';

@Injectable()
export class PostgreService {
    constructor(@InjectRepository(NotificationMessage) private readonly notificationMessageModel: Repository<NotificationMessage>) {}

    public async findAllNotificationMessage(params: IFindAllNotificationMessage) {
        const { mediaId, status } = params;
        return await this.notificationMessageModel.find({ where: { ...params } });
    }

    public async findOneEvent(params: IFindOneEvent) {
        return;
    }

    public async findOneTransaction(params: IFindOneTransaction) {
        return;
    }
}
