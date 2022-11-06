import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogService } from './log.service';
import { Models } from './models/model';

@Module({
    imports: [MongooseModule.forFeature(Models)],
    providers: [LogService],
    exports: [LogService],
})
export class LogModule {}
