import { Injectable } from "@nestjs/common";
import * as moment from "moment";

@Injectable()
export class BaseFunctions {
    public validateString = (request: string, type: ITypeString): string => {
        if (!request) return "";

        switch (type) {
            case "char":
                return request.replace(/[^a-z\d\s]+/gi, "");

            case "numeric":
                return request.replace(/[^0-9]/g, "");

            case "encode":
                return Buffer.from(request).toString("base64");

            case "decode":
                return Buffer.from(request, "base64").toString("ascii");
        }
    };

    public validateTime = (request: Date, type: ITypeTime): string => {
        if (!moment(request).isValid()) return "";

        switch (type) {
            case "date":
                return moment(request).format("YYYY-MM-DD");

            case "datetime":
                return moment(request).format("YYYY-MM-DD HH:mm:ss");
        }
    };
}
