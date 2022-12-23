import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export default new DataSource({
    type: 'postgres',
    host: process.env.PROJECT_DB_HOST,
    port: +process.env.PROJECT_DB_PORT,
    username: process.env.PROJECT_DB_USER,
    password: process.env.PROJECT_DB_PASS,
    database: process.env.PROJECT_DB_NAME,
    synchronize: false,
    connectTimeoutMS: 60000,
    entities: ['dist/datasource/postgre/**/*.entity.{ts,js}'],
    migrations: ['dist/datasource/postgre/migrations/*.{ts,js}'],
});
