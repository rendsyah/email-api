import { AttachmentSchema } from './attachment.model';
import { EmailLogIncomingSchema } from './log-incoming.model';
import { EmailLogOutgoingSchema } from './log-outgoing.model';

export const mongoModels = [
    {
        name: 'Attachment',
        schema: AttachmentSchema,
    },
    {
        name: 'LogIncoming',
        schema: EmailLogIncomingSchema,
    },
    {
        name: 'LogOutgoing',
        schema: EmailLogOutgoingSchema,
    },
];
