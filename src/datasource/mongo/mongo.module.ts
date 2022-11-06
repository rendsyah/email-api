import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo.service';
import { mongoModels } from './models/model';

@Module({
    imports: [MongooseModule.forFeature(mongoModels)],
    providers: [MongoService],
    exports: [MongoService],
})
export class MongoModule {}
