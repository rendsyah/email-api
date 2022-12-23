import { BullModuleOptions, SharedBullAsyncConfiguration, SharedBullConfigurationFactory } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

export class RedisConfig implements SharedBullConfigurationFactory {
    constructor(private configService: ConfigService) {}

    createSharedConfiguration(): BullModuleOptions {
        return {
            redis: {
                host: this.configService.get<string>('QUEUE_HOST'),
                port: +this.configService.get<string>('QUEUE_PORT'),
            },
        };
    }
}

export const redisConfigAsync: SharedBullAsyncConfiguration = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<BullModuleOptions> => {
        return new RedisConfig(configService).createSharedConfiguration();
    },
};
