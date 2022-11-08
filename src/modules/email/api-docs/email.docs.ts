import { applyDecorators, Type } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOperation,
    getSchemaPath,
} from '@nestjs/swagger';

export const ApiEmailOperation = (params: string = '') => {
    return applyDecorators(ApiOperation({ summary: `Send ${params} email`, description: `API documentation for send ${params} email` }));
};

export const ApiEmailBody = <TModel extends Type<any>>(model: TModel, params: string = '') => {
    return applyDecorators(ApiBody({ description: `Request body for send ${params} email`, type: model }));
};

export const ApiEmailCreated = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiCreatedResponse({
            description: 'Successfully sending email',
        }),
    );
};

export const ApiEmailBadRequest = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiBadRequestResponse({
            description: 'Bad request for parameters',
        }),
    );
};

export const ApiEmailInternalServerError = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
        }),
    );
};
