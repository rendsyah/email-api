import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);
    const service = config.get<string>('SERVICE_NAME');
    const port = config.get<string>('SERVICE_PORT');

    app.use(helmet());
    app.enableCors();

    await app.listen(process.env.SERVICE_PORT, () => {
        console.log(`Service ${service} running on port ${port}`);
    });
}
bootstrap();
