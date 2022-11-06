import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { ICreatedLogOutgoing, IUpdateLogOutgoing } from './interfaces/log-outgoing.interface';
import { EmailLogIncomingDocument } from './models/log-incoming.model';
import { EmailLogOutgoingDocument } from './models/log-outgoing.model';

@Injectable()
export class LogService {
    constructor(
        @InjectModel('LogIncoming') private readonly logIncomingModel: Model<EmailLogIncomingDocument>,
        @InjectModel('LogOutgoing') private readonly logOutgoingModel: Model<EmailLogOutgoingDocument>,
    ) {}

    public async createdIncomingLog(params: {}): Promise<Document> {
        const createdIncomingLog = new this.logIncomingModel(params);
        return createdIncomingLog.save();
    }

    public async createdOutgoingLog(params: ICreatedLogOutgoing): Promise<Document> {
        const createdOutgoingLog = new this.logOutgoingModel(params);
        return createdOutgoingLog.save();
    }

    public async updateOutgoingLog(params: IUpdateLogOutgoing): Promise<void> {
        const { id, status, isAck } = params;
        await this.logOutgoingModel.updateOne({ _id: id }, { $set: { status: status, isAck: isAck } });
    }
}
