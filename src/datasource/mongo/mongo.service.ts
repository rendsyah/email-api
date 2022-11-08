import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { IFindOneAttachment } from './interfaces/attachment.interface';
import { ICreatedLogIncoming } from './interfaces/log-incoming.interface';
import { ICreatedLogOutgoing, IUpdateLogOutgoing } from './interfaces/log-outgoing.interface';
import { AttachmentDocument } from './models/attachment.model';
import { EmailLogIncomingDocument } from './models/log-incoming.model';
import { EmailLogOutgoingDocument } from './models/log-outgoing.model';

@Injectable()
export class MongoService {
    constructor(
        @InjectModel('Attachment') private readonly attachmentModel: Model<AttachmentDocument>,
        @InjectModel('LogIncoming') private readonly logIncomingModel: Model<EmailLogIncomingDocument>,
        @InjectModel('LogOutgoing') private readonly logOutgoingModel: Model<EmailLogOutgoingDocument>,
    ) {}

    public async findOneAttachment(params: IFindOneAttachment): Promise<AttachmentDocument> {
        return await this.attachmentModel.findOne(params);
    }

    public async createdLogIncoming(params: ICreatedLogIncoming): Promise<EmailLogIncomingDocument> {
        return new this.logIncomingModel(params).save();
    }

    public async createdLogOutgoing(params: ICreatedLogOutgoing): Promise<EmailLogOutgoingDocument> {
        return new this.logOutgoingModel(params).save();
    }

    public async updateOneLogOutgoing(params: IUpdateLogOutgoing): Promise<UpdateWriteOpResult> {
        return await this.logOutgoingModel.updateOne({ _id: params.id }, { $set: params });
    }
}
