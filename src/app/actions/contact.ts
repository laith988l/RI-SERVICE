"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

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

    revalidatePath('/admin');
    return { success: true };
}
