"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function getDashboardData() {
    const [servicesReq, testimonialsReq, feedbackReq, contactReq] = await Promise.all([
        supabaseAdmin.from('services').select('*').order('created_at', { ascending: false }),
        supabaseAdmin.from('testimonials').select('*').order('created_at', { ascending: false }),
        supabaseAdmin.from('feedback').select('*').order('created_at', { ascending: false }),
        supabaseAdmin.from('contact_requests').select('*').order('created_at', { ascending: false })
    ]);

    return {
        services: servicesReq.data || [],
        testimonials: testimonialsReq.data || [],
        feedback: feedbackReq.data || [],
        contact_requests: contactReq.data || []
    };
}

export async function addService(formData: FormData) {
    let image_url = formData.get('image_url') as string | null;
    const file = formData.get('image') as File | null;

    if (file && file.size > 0) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabaseAdmin.storage
            .from('services')
            .upload(fileName, file);

        if (uploadError) throw new Error(uploadError.message);

        const { data } = supabaseAdmin.storage.from('services').getPublicUrl(fileName);
        image_url = data.publicUrl;
    }

    // Convert standard Google Drive link to direct image link (using thumbnail API to bypass third-party embeds block)
    if (image_url && image_url.includes('drive.google.com/file/d/')) {
        const match = image_url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            image_url = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
        }
    }

    const title = formData.get('title') as string;

    let parsedFeatures: string[] = [];
    const featuresStr = formData.get('features') as string;
    if (featuresStr) {
        try {
            parsedFeatures = JSON.parse(featuresStr);
            if (!Array.isArray(parsedFeatures)) parsedFeatures = [featuresStr];
        } catch {
            parsedFeatures = featuresStr.split(',').map(s => s.trim()).filter(Boolean);
        }
    }

    const data = {
        title,
        category: formData.get('category'),
        description: formData.get('description') || '',
        long_description: formData.get('long_description') || '',
        price: '',
        image_url: image_url || null,
        features: parsedFeatures
    };

    console.log("Attempting to insert service to DB:", data);
    try {
        const { error } = await supabaseAdmin.from('services').insert({
            ...data,
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        });
        if (error) {
            console.error("Supabase insert error:", error);
            throw new Error(error.message);
        }
    } catch (err) {
        console.error("Caught error during DB Insert:", err);
        throw err;
    }

    revalidatePath('/admin');
    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath('/services/request');
    revalidatePath('/contact');
}

export async function updateService(id: string, formData: FormData) {
    let image_url = formData.get('image_url') as string | null;
    const file = formData.get('image') as File | null;

    if (file && file.size > 0) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabaseAdmin.storage
            .from('services')
            .upload(fileName, file);

        if (uploadError) throw new Error(uploadError.message);

        const { data } = supabaseAdmin.storage.from('services').getPublicUrl(fileName);
        image_url = data.publicUrl;
    }

    // Convert standard Google Drive link to direct image link (using thumbnail API to bypass third-party embeds block)
    if (image_url && image_url.includes('drive.google.com/file/d/')) {
        const match = image_url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            image_url = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
        }
    }

    const title = formData.get('title') as string;

    let parsedFeatures: string[] = [];
    const featuresStr = formData.get('features') as string;
    if (featuresStr) {
        try {
            parsedFeatures = JSON.parse(featuresStr);
            if (!Array.isArray(parsedFeatures)) parsedFeatures = [featuresStr];
        } catch {
            parsedFeatures = featuresStr.split(',').map(s => s.trim()).filter(Boolean);
        }
    }

    const data = {
        title,
        category: formData.get('category'),
        description: formData.get('description') || '',
        long_description: formData.get('long_description') || '',
        price: '',
        image_url: image_url || null,
        features: parsedFeatures
    };

    console.log("Attempting to update service in DB:", data);
    try {
        const { error } = await supabaseAdmin.from('services').update({
            ...data,
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        }).eq('id', id);
        if (error) {
            console.error("Supabase update error:", error);
            throw new Error(error.message);
        }
    } catch (err) {
        console.error("Caught error during DB Update:", err);
        throw err;
    }
    revalidatePath('/admin');
    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath('/services/request');
    revalidatePath('/contact');
}

export async function deleteService(id: string) {
    const { error } = await supabaseAdmin.from('services').delete().eq('id', id);
    if (error) throw new Error(error.message);
    revalidatePath('/admin');
    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath('/services/request');
    revalidatePath('/contact');
}

export async function toggleServiceVisibility(id: string, is_visible: boolean) {
    const { error } = await supabaseAdmin.from('services').update({ is_visible }).eq('id', id);
    if (error) throw new Error(error.message);
    revalidatePath('/admin');
    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath('/services/request');
    revalidatePath('/contact');
}

export async function updateTestimonialStatus(id: string, status: 'approved' | 'rejected') {
    const { error } = await supabaseAdmin.from('testimonials').update({ status }).eq('id', id);
    if (error) throw new Error(error.message);
    revalidatePath('/admin');
    revalidatePath('/');
}

export async function toggleTestimonialVisibility(id: string, is_visible: boolean) {
    const { error } = await supabaseAdmin.from('testimonials').update({ is_visible }).eq('id', id);
    if (error) throw new Error(error.message);
    revalidatePath('/admin');
    revalidatePath('/');
}

export async function deleteTestimonial(id: string) {
    const { error } = await supabaseAdmin.from('testimonials').delete().eq('id', id);
    if (error) throw new Error(error.message);
    revalidatePath('/admin');
    revalidatePath('/');
}

export async function deleteFeedback(id: string) {
    const { error } = await supabaseAdmin.from('feedback').delete().eq('id', id);
    if (error) throw new Error(error.message);
    revalidatePath('/admin');
}

export async function deleteContactRequest(id: string) {
    const { error } = await supabaseAdmin.from('contact_requests').delete().eq('id', id);
    if (error) throw new Error(error.message);
    revalidatePath('/admin');
}

export async function approveFeedbackAsTestimonial(id: string) {
    // 1. Get the feedback
    const { data: feedback, error: fetchError } = await supabaseAdmin.from('feedback').select('*').eq('id', id).single();
    if (fetchError || !feedback) throw new Error(fetchError?.message || 'Feedback not found');

    // 2. Insert as approved testimonial
    const { error: insertError } = await supabaseAdmin.from('testimonials').insert({
        name: `${feedback.first_name} ${feedback.last_name}`,
        title: feedback.company_name || 'Kunde',
        quote: feedback.feedback_text,
        status: 'approved',
        rating: feedback.rating || 5
    });
    if (insertError) throw new Error(insertError.message);

    // 3. Delete the feedback (or you could keep it and mark it converted, but deleting is simpler for an inbox style)
    await supabaseAdmin.from('feedback').delete().eq('id', id);

    revalidatePath('/admin');
    revalidatePath('/');
}
