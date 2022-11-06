import { Module } from '@nestjs/common';
import { LogModule } from 'src/datasource/log/log.module';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
    imports: [LogModule],
    controllers: [EmailController],
    providers: [EmailService],
})
export class EmailModule {}
