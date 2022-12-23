import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

//Config
import { swaggerApiConfig } from './commons/config/open-api/swagger.config';
import { AllExceptionsFilter } from './commons/filter/all-exceptions-filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);
    const service = config.get<string>('SERVICE_NAME');
    const port = config.get<string>('SERVICE_PORT');
    const httpAdapterHost = app.get(HttpAdapterHost);

    app.use(helmet());
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
    app.enableCors();

    const swaggerConfig = swaggerApiConfig(app);
    SwaggerModule.setup('api/docs', app, swaggerConfig);

    await app.listen(process.env.SERVICE_PORT, () => {
        console.log(`Service ${service} running on port ${port}`);
    });
}
bootstrap();
