import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions, MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

export class MongooseConfig implements MongooseOptionsFactory {
    constructor(private configService: ConfigService) {}

    public createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: this.configService.get<string>('PROJECT_MONGO_DB_HOST'),
            user: this.configService.get<string>('PROJECT_MONGO_DB_USER'),
            pass: this.configService.get<string>('PROJECT_MONGO_DB_PASS'),
            authSource: this.configService.get<string>('PROJECT_MONGO_DB_AUTH'),
            replicaSet: this.configService.get<string>('PROJECT_MONG_DB_REPLICA'),
            retryWrites: true,
            connectTimeoutMS: 30000,
        };
    }
}

export const mongooseConfigAsync: MongooseModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => {
        return new MongooseConfig(configService).createMongooseOptions();
    },
    inject: [ConfigService],
};
