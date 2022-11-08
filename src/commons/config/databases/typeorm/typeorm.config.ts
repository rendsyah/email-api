import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export class TypeOrmConfig implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('PROJECT_DB_HOST'),
            port: +this.configService.get<string>('PROJECT_DB_PORT'),
            username: this.configService.get<string>('PROJECT_DB_USER'),
            password: this.configService.get<string>('PROJECT_DB_PASS'),
            database: this.configService.get<string>('PROJECT_DB_NAME'),
            synchronize: false,
            connectTimeoutMS: 30000,
            entities: ['dist/datasource/postgre/**/*.entity.{ts,js}'],
            migrations: ['dist/datasource/postgre/migrations/*.{ts,js}'],
        };
    }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        return new TypeOrmConfig(configService).createTypeOrmOptions();
    },
    dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
    },
};
