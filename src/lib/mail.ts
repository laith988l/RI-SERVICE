import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
    },
});

type MailOptions = {
    to: string;
    subject: string;
    text?: string;
    html?: string;
};

export async function sendMail(options: MailOptions) {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log('Mail was not sent. SMTP credentials are not configured.');
        return { success: false, message: 'SMTP credentials missing' };
    }

    try {
        const info = await transporter.sendMail({
            from: `"RI Service" <${process.env.SMTP_USER}>`, // sender address
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        });

        console.log("Message sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}
