import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BaseFunctionsModule } from "./commons/libs/function.module";
import { EmailModule } from "./modules/email/email.module";

@Module({
    imports: [EmailModule, BaseFunctionsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
