import { EmailLogIncomingSchema } from './log-incoming.model';
import { EmailLogOutgoingSchema } from './log-outgoing.model';

export const mongoModels = [
    {
        name: 'LogIncoming',
        schema: EmailLogIncomingSchema,
    },

    {
        name: 'LogOutgoing',
        schema: EmailLogOutgoingSchema,
    },
];
