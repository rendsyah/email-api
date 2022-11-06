import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfigAsync } from './mongoose.config';

@Module({
    imports: [MongooseModule.forRootAsync(mongooseConfigAsync)],
})
export class MongooseConfigModule {}
