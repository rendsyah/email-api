import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgreService } from './postgre.service';
import { PostgreModels } from './models/models.entity';

@Module({
    imports: [TypeOrmModule.forFeature(PostgreModels)],
    providers: [PostgreService],
    exports: [PostgreService],
})
export class PostgreModule {}
