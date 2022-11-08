import { ApiProperty } from '@nestjs/swagger';

export class EmailNotificationDTO {
    @ApiProperty({ minimum: 1, default: 1 })
    entriesId: number;
}

export class EmailBulkNotificationDTO {}
