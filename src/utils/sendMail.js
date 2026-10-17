import nodemailer from 'nodemailer';
import 'dotenv/config';

const port = Number(process.env.SMTP_PORT);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export const sendEmail = async (options) => {
  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    ...options,
  });
};
