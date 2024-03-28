import nodemailer from "nodemailer";
import { smtpPassword, smtpUsername } from "../serect.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: smtpUsername,
        pass: smtpPassword,
    },
});

const emailWithNodeMailer = async (emailData) => {
    try {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: smtpUsername, // sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // Subject line
            html: emailData.html, // html body
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default emailWithNodeMailer;
