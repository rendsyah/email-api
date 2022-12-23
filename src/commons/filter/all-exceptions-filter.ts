import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as moment from 'moment';

// Config
import { loggerConsole } from '../logger/logger.config';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();
        const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        if (httpStatus === 500) {
            loggerConsole.error(exception);
        }

        const responseBody =
            exception instanceof HttpException
                ? exception.getResponse()
                : {
                      statusCode: httpStatus,
                      message: 'Internal Server Error',
                      errors: {
                          path: httpAdapter.getRequestUrl(ctx.getRequest()),
                          timestamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                      },
                  };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
