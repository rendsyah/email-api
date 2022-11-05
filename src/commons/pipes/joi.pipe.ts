import { ArgumentMetadata, HttpException, HttpStatus, PipeTransform } from "@nestjs/common";
import { ObjectSchema } from "joi";

export class JoiValidationPipe implements PipeTransform {
    constructor(private validationSchema: ObjectSchema) {}

    public transform(value: unknown, metadata: ArgumentMetadata) {
        const { error } = this.validationSchema.validate(value);

        if (error) {
            throw new HttpException(
                {
                    errors: {
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: "Bad Request",
                        params: error.details[0].path,
                        detail: error.message.replace(/[^a-z\s]+/gi, ""),
                    },
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        return value;
    }
}
