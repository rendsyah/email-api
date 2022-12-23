// Modules
import * as winston from 'winston';
import * as root from 'app-root-path';
import expressWinston from 'express-winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Desctructuring Modules
const { createLogger, format, transports } = winston;
const { combine, colorize, errors, ms, printf, timestamp } = format;

// Logger Transports
export const loggerTransport = {
    // info: new DailyRotateFile({
    //     filename: `${root}/../logs/${process.env.PROGRAM_NAME}/info/%DATE%.log`,
    //     datePattern: 'YYYY-MM-DD-HH',
    //     zippedArchive: true,
    //     maxSize: '100m',
    //     maxFiles: '14d',
    //     frequency: '1h',
    // }),
    // error: new DailyRotateFile({
    //     filename: `${root}/../logs/${process.env.PROGRAM_NAME}/error/%DATE%.log`,
    //     datePattern: 'YYYY-MM-DD-HH',
    //     zippedArchive: true,
    //     maxSize: '100m',
    //     maxFiles: '14d',
    //     frequency: '1h',
    //     level: 'error',
    // }),
    console: new transports.Console(),
};

// Logger Format
const loggerFormat = printf(({ level, message, timestamp, stack, ms }) => {
    return `${timestamp} ${level}: ${message || stack} (${ms})`;
});

// Logger
export const loggerConsole = createLogger({
    format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), ms(), loggerFormat),
    defaultMeta: { service: process.env.PROGRAM_NAME },
    transports: [loggerTransport.console],
});
