import { EmailLogIncomingSchema } from './log-incoming.model';
import { EmailLogOutgoingSchema } from './log-outgoing.model';

export const Models = [
    {
        name: 'LogIncoming',
        schema: EmailLogIncomingSchema,
    },

    {
        name: 'LogOutgoing',
        schema: EmailLogOutgoingSchema,
    },
];
