require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

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
    console.log("Simulating form submission...");
    const data = {
        first_name: "Laith",
        last_name: "Test (Form Simulation)",
        email: "test.form.dashboard@example.com",
        phone: "01721234567",
        service_interest: "Test Service",
        message: "This is another test submission. It should arrive in the info@ri-service24.de mailbox AND be immediately visible in your Admin Dashboard under Contact Requests.",
        accepted_terms: true
    };

    // 1. Insert into DB
    const { data: inserted, error } = await supabaseAdmin.from('contact_requests').insert(data).select();
    if (error) {
        console.error("SUPABASE CONTACT INSERT ERROR:", error);
        return;
    }
    console.log("Successfully inserted contact request into Dashboard:", inserted);

    // 2. Send email
    const notifyEmail = process.env.ADMIN_NOTIFY_EMAIL || 'info@ri-service24.de';
    try {
        const info = await transporter.sendMail({
            from: `"RI Service" <${process.env.SMTP_USER}>`,
            to: notifyEmail,
            subject: `Neue Kontaktanfrage von ${data.first_name} ${data.last_name}`,
            html: `
                <h2>Neue Kontaktanfrage</h2>
                <p><strong>Name:</strong> ${data.first_name} ${data.last_name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Telefon:</strong> ${data.phone}</p>
                <p><strong>Interesse:</strong> ${data.service_interest}</p>
                <br/>
                <h3>Nachricht:</h3>
                <p>${data.message}</p>
            `,
        });
        console.log("Email notification sent successfully. Message ID:", info.messageId);
    } catch (e) {
        console.error("Error sending email:", e);
    }
}

main();
