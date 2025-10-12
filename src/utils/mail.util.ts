import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SENDER_EMAIL} = process.env;

const sendEmail = async (email: string, otpCode: number) => {
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: false,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASSWORD,
        },
    });

    const message = {
        from: SENDER_EMAIL,
        to: email,
        subject: "Opt Verification",
        html: `You account verification code is <em> ${otpCode} </em>.`,
    };
    await transporter.sendMail(message);

}

export default sendEmail;

