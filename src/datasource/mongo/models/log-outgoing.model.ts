import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmailLogOutgoingDocument = HydratedDocument<EmailLogOutgoing>;

@Schema({ collection: 'logsOutgoing', timestamps: true })
export class EmailLogOutgoing {
    @Prop({ isRequired: true })
    from: string;

    @Prop({ isRequired: true })
    to: string;

    @Prop({ isRequired: true })
    message: string;

    @Prop({ default: '' })
    attachment: string;

    @Prop({ isRequired: true })
    sentTime: string;

    @Prop({ isRequired: true })
    mediaId: number;

    @Prop({ isRequired: true })
    eventId: number;

    @Prop({ default: '' })
    status: string;

    @Prop({ default: 0 })
    isAck: number;

    @Prop({ default: 0 })
    isDeleted: number;

    @Prop({ default: null })
    deletedAt: string;
}

export const EmailLogOutgoingSchema = SchemaFactory.createForClass(EmailLogOutgoing);
