import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { ICreatedLogIncoming } from './interfaces/log-incoming.interface';
import { ICreatedLogOutgoing, IUpdateLogOutgoing } from './interfaces/log-outgoing.interface';
import { EmailLogIncomingDocument } from './models/log-incoming.model';
import { EmailLogOutgoingDocument } from './models/log-outgoing.model';

@Injectable()
export class MongoService {
    constructor(
        @InjectModel('LogIncoming') private readonly logIncomingModel: Model<EmailLogIncomingDocument>,
        @InjectModel('LogOutgoing') private readonly logOutgoingModel: Model<EmailLogOutgoingDocument>,
    ) {}

    public async createdLogIncoming(params: ICreatedLogIncoming): Promise<Document> {
        return new this.logIncomingModel(params).save();
    }

    public async createdLogOutgoing(params: ICreatedLogOutgoing): Promise<Document> {
        return new this.logOutgoingModel(params).save();
    }

    public async updateOneLogOutgoing(params: IUpdateLogOutgoing): Promise<unknown> {
        const { id, message, attachment, sentTime, status, isAck } = params;
        return await this.logOutgoingModel.updateOne(
            { _id: id },
            { $set: { message: message, attachment: attachment, sentTime: sentTime, status: status, isAck: isAck } },
        );
    }
}
