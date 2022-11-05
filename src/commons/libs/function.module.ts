import { Global, Module } from "@nestjs/common";
import { BaseFunctions } from "./function.service";

@Global()
@Module({
    providers: [BaseFunctions],
    exports: [BaseFunctions],
})
export class BaseFunctionsModule {}
