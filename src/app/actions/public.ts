"use server";

import { supabase } from "@/lib/supabase";

export async function getApprovedTestimonials() {
    const { data: testimonials } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "approved")
        .neq("is_visible", false)
        .order("created_at", { ascending: false });
    return testimonials || [];
}

export async function getPublicServices() {
    const { data: services } = await supabase
        .from("services")
        .select("*")
        .neq("is_visible", false)
        .order("created_at", { ascending: true });
    return services || [];
}
