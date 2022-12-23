import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfigSchema } from './env.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            validationSchema: envConfigSchema,
        }),
    ],
})
export class EnvModule {}
