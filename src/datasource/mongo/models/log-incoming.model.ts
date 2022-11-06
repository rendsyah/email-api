import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmailLogIncomingDocument = HydratedDocument<EmailLogIncoming>;

@Schema({ collection: 'logsIncoming', timestamps: true })
export class EmailLogIncoming {
    @Prop({ isRequired: true })
    from: string;

    @Prop({ isRequired: true })
    to: string;

    @Prop({ isRequired: true })
    message: string;

    @Prop({ default: '' })
    attachment: string;

    @Prop({ isRequired: true })
    receivedTime: Date;

    @Prop({ isRequired: true })
    mediaId: number;

    @Prop({ isRequired: true })
    eventId: number;

    @Prop({ default: '' })
    device: string;

    @Prop({ default: '' })
    status: string;

    @Prop({ default: 0 })
    isAck: number;

    @Prop({ default: 0 })
    isDeleted: number;

    @Prop({ default: null })
    deletedAt: Date;
}

export const EmailLogIncomingSchema = SchemaFactory.createForClass(EmailLogIncoming);
