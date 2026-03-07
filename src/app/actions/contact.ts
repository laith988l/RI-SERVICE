"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { sendMail } from "@/lib/mail";

export async function submitContactRequest(formData: FormData) {
    const data = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service_interest: formData.get('service_interest'),
        message: formData.get('message'),
        accepted_terms: true
    };

    const { error } = await supabaseAdmin.from('contact_requests').insert(data);
    if (error) {
        console.error("SUPABASE CONTACT INSERT ERROR:", error);
        throw new Error(error.message);
    }

    // Send email notification dynamically using env fallback to the main business email
    const notifyEmail = process.env.ADMIN_NOTIFY_EMAIL || 'info@ri-service24.de';
    const emailResult = await sendMail({
        to: notifyEmail,
        subject: `Neue Kontaktanfrage von ${data.first_name} ${data.last_name}`,
        html: `
            <h2>Neue Kontaktanfrage</h2>
            <p><strong>Name:</strong> ${data.first_name} ${data.last_name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Telefon:</strong> ${data.phone || 'Nicht angegeben'}</p>
            <p><strong>Interesse:</strong> ${data.service_interest || 'Nicht angegeben'}</p>
            <br/>
            <h3>Nachricht:</h3>
            <p>${data.message}</p>
        `,
    });

    if (!emailResult.success) {
        console.error("EMAIL SENDING ERROR (Contact):", emailResult.error || emailResult.message);
        throw new Error("Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut.");
    }

    revalidatePath('/admin');
    return { success: true };
}

export async function submitFeedback(formData: FormData, rating: number) {
    const data = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        company_name: formData.get('company_name'),
        feedback_text: formData.get('feedback_text'),
        rating
    };

    const { error } = await supabaseAdmin.from('feedback').insert(data);
    if (error) throw new Error(error.message);

    // Send email notification dynamically using env fallback
    const notifyEmail = process.env.ADMIN_NOTIFY_EMAIL || 'info@ri-service24.de';
    const emailResult = await sendMail({
        to: notifyEmail,
        subject: `Neues Feedback von ${data.first_name} ${data.last_name}`,
        html: `
            <h2>Neues Feedback erhalten</h2>
            <p><strong>Name:</strong> ${data.first_name} ${data.last_name}</p>
            <p><strong>Firma:</strong> ${data.company_name || 'Privat'}</p>
            <p><strong>Bewertung:</strong> ${rating} von 5 Sternen</p>
            <br/>
            <h3>Feedback Text:</h3>
            <p>${data.feedback_text}</p>
        `,
    });

    if (!emailResult.success) {
        console.error("EMAIL SENDING ERROR (Feedback):", emailResult.error || emailResult.message);
        throw new Error("Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut.");
    }

    revalidatePath('/admin');
    return { success: true };
}
