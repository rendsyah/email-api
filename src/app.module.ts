import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseConfigModule } from './commons/config/databases/mongoose/mongoose.module';
import { RedisConfigModule } from './commons/config/databases/redis/bull.module';
import { TypeOrmConfigModule } from './commons/config/databases/typeorm/typeorm.module';
import { EnvModule } from './commons/config/env/env.module';
import { BaseFunctionsModule } from './commons/libs/base-function.module';
import { EmailModule } from './modules/email/email.module';

@Module({
    imports: [EnvModule, MongooseConfigModule, RedisConfigModule, TypeOrmConfigModule, BaseFunctionsModule, EmailModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
