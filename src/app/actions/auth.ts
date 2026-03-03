"use server";

import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
        // Correct credentials -> set a secure HTTP-only cookie
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" && process.env.VERCEL === "1",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });
        return { success: true };
    }

    return { error: "Invalid email or password." };
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
}
