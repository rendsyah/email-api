import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseConfigModule } from './commons/config/databases/mongoose/mongoose.module';
import { TypeOrmConfigModule } from './commons/config/databases/typeorm/typeorm.module';
import { validationConfigSchema } from './commons/config/env.config';
import { BaseFunctionsModule } from './commons/libs/base-function.module';
import { EmailModule } from './modules/email/email.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true, cache: true, validationSchema: validationConfigSchema }),
        MongooseConfigModule,
        TypeOrmConfigModule,
        BaseFunctionsModule,
        EmailModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
