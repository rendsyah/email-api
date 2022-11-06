import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class BaseFunctions {
    public validateString(request: string, type: IValidateStringType): string {
        if (!request) return '';

        switch (type) {
            case 'char':
                return request.replace(/[^a-z\d\s]+/gi, '');

            case 'numeric':
                return request.replace(/[^0-9]/g, '');

            case 'encode':
                return Buffer.from(request).toString('base64');

            case 'decode':
                return Buffer.from(request, 'base64').toString('ascii');
        }
    }

    public validateTime(request: Date, type: IValidateTimeType): string {
        if (!moment(request).isValid()) return '';

        switch (type) {
            case 'date':
                return moment(request).format('YYYY-MM-DD');

            case 'datetime':
                return moment(request).format('YYYY-MM-DD HH:mm:ss');
        }
    }

    public validateReplaceMessage(request: string, variables: string[]) {
        if (!request) return '';

        variables.forEach((v, i) => {
            const variable = v;
            request = request.replace(`{{${i + 1}}}`, variable);
        });

        return request;
    }
}
