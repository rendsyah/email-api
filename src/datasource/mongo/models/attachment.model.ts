import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AttachmentDocument = HydratedDocument<Attachment>;

@Schema({ collection: 'attachment', timestamps: true })
export class Attachment {
    @Prop({ isRequired: true })
    entriesId: string;

    @Prop({ isRequired: true })
    eventId: number;

    @Prop({ isRequired: true })
    path: string;

    @Prop({ isRequired: true })
    attachment: string;

    @Prop({ default: 1 })
    status: string;

    @Prop({ default: 0 })
    isDeleted: number;

    @Prop({ default: null })
    deletedAt: Date;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);
