import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerApiConfig = (app: INestApplication) => {
    const configApi = new DocumentBuilder()
        .setTitle('Email API')
        .setDescription('Email API documentation')
        .setTermsOfService('http://example.com/terms')
        .setContact('Developer', 'http://www.example.com/support', 'rndyfrdynsyh@gmail.com')
        .setVersion('1.0')
        .setLicense('Apache 2.0', 'https://www.apache.org/licenses/LICENSE-2.0.html')
        .build();

    const documentApi = SwaggerModule.createDocument(app, configApi);

    return documentApi;
};
