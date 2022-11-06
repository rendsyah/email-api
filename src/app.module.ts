import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseConfigModule } from './commons/config/databases/mongoose/mongoose.module';
import { TypeOrmConfigModule } from './commons/config/databases/typeorm/typeorm.module';
import { ValidationConfigDatabase } from './commons/config/databases/database.config';
import { BaseFunctionsModule } from './commons/libs/function.module';
import { EmailModule } from './modules/email/email.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, cache: true, validate: ValidationConfigDatabase }),
        MongooseConfigModule,
        TypeOrmConfigModule,
        BaseFunctionsModule,
        EmailModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
