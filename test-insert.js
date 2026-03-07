require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log("Testing insert into contact_requests...");
    const data = {
        first_name: "Test",
        last_name: "User",
        email: "test@example.com",
        phone: "1234567890",
        service_interest: "General",
        message: "This is a test message from a debugging script.",
        accepted_terms: true
    };

    const { data: inserted, error } = await supabaseAdmin.from('contact_requests').insert(data).select();
    if (error) {
        console.error("SUPABASE CONTACT INSERT ERROR:", error);
    } else {
        console.log("Successfully inserted contact request:", inserted);
    }
}

main();
