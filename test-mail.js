require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
    },
});

async function main() {
    console.log('Testing SMTP connection...');
    try {
        const info = await transporter.sendMail({
            from: `"Test Mailer" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_NOTIFY_EMAIL,
            subject: "Test Email from RI Service app",
            text: "This is a test email to verify the SMTP configuration.",
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

main();
