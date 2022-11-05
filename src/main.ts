import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: false,
    });

    app.use(helmet());
    app.enableCors();

    await app.listen(process.env.SERVICE_PORT, () => {
        console.log(`Service ${process.env.SERVICE_NAME} running on port ${process.env.SERVICE_PORT}`);
    });
}
bootstrap();
