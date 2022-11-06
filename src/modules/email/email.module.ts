import { Module } from '@nestjs/common';
import { MongoModule } from 'src/datasource/mongo/mongo.module';
import { PostgreModule } from 'src/datasource/postgre/postgre.module';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
    imports: [MongoModule, PostgreModule],
    controllers: [EmailController],
    providers: [EmailService],
})
export class EmailModule {}
