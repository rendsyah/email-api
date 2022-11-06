import * as Joi from 'joi';

export const validationConfigSchema = Joi.object({
    NODE_ENV: Joi.string().required(),
    SERVICE_PORT: Joi.number().required(),
    SERVICE_NAME: Joi.string().required(),
    EMAIL_SERVICE: Joi.string().required(),
    EMAIL_USER: Joi.string().email().required(),
    EMAIL_PASS: Joi.string().required(),
    PROJECT_DB_HOST: Joi.string().required(),
    PROJECT_DB_PORT: Joi.number().required(),
    PROJECT_DB_USER: Joi.string().required(),
    PROJECT_DB_PASS: Joi.string().required(),
    PROJECT_DB_NAME: Joi.string().required(),
    PROJECT_MONGO_DB_HOST: Joi.string().required(),
    PROJECT_MONGO_DB_USER: Joi.string().allow(''),
    PROJECT_MONGO_DB_PASS: Joi.string().allow(''),
    PROJECT_MONGO_DB_AUTH: Joi.string().allow(''),
    PROJECT_MONGO_DB_REPLICA: Joi.string().allow(''),
});
