import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, validateSync } from 'class-validator';

enum NodeEnvironment {
    Development = 'development',
    Production = 'production',
}

class DatabaseEnvironment {
    @IsEnum(NodeEnvironment, { message: 'environment not exists' })
    NODE_ENV: NodeEnvironment;

    @IsNumber({ allowNaN: false, allowInfinity: false })
    PROJECT_DB_PORT: number;
}

export function ValidationConfigDatabase(config: Record<string, unknown>) {
    const configuration = plainToInstance(DatabaseEnvironment, config, { enableImplicitConversion: true });
    const errors = validateSync(configuration, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw Error(errors.toString());
    }

    return configuration;
}
