import { Injectable } from "@nestjs/common";
import { BaseFunctions } from "src/commons/libs/function.service";
import { EmailNotificationDTO } from "./dto/email.dto";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
    private masterText: string[];

    constructor(private baseFunctions: BaseFunctions) {}

    private async _emailTransporter() {
        if (this.masterText.length === 0) {
            this.masterText.push("asdasd");
        }

        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            from: process.env.EMAIL_USER,
            subject: process.env.EMAIL_SUBJECT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        return transporter;
    }

    public async emailNotification(params: EmailNotificationDTO) {
        const { name, email } = params;

        const transporter = await this._emailTransporter();

        const options = {
            to: email,
            text: `Hello ${name} test`,
            // attachments: [
            //     {
            //         filename: "",
            //         content: "",
            //         path: "",
            //     },
            // ],
        };

        transporter.sendMail(options, (error) => {
            if (error) {
                console.log(error);
            }
        });

        return "ok";
    }

    public async emailBulkNotification() {
        return;
    }
}
