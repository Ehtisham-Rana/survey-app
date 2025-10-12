import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SENDER_EMAIL} = process.env;

export const sendEmailOtp = async (email: string, otpCode: number) => {
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
        subject: `OTP Verification`,
        html: `You account verification code: <b>${otpCode}</b>.`,
    };
    await transporter.sendMail(message);

}

export const sendEmailLink = async (email: string, resetLink: string) => {
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
        from: `"Survey App" <${SENDER_EMAIL}>`,
        to: email,
        subject: "Password Reset Request",
        html: `
            <p>We received a request to reset your password.</p>
            <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
            <p>This link will expire in 15 minutes.</p>
        `,
    };
    await transporter.sendMail(message);

}

