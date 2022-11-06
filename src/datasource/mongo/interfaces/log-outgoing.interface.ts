export interface ICreatedLogOutgoing {
    from: string;
    to: string;
    message: string;
    attachment: string;
    sentTime: string;
    mediaId: number;
    eventId: number;
    status: string;
}

export interface IUpdateLogOutgoing {
    id: string;
    message: string;
    attachment: string;
    sentTime: string;
    status: string;
    isAck: number;
}
