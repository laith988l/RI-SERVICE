require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log("Testing fetch from contact_requests...");
    const { data: contactReq, error } = await supabaseAdmin.from('contact_requests').select('*').order('created_at', { ascending: false });

    if (error) {
        console.error("SUPABASE CONTACT FETCH ERROR:", error);
    } else {
        console.log(`Successfully fetched ${contactReq.length} contact requests.`);
        console.log(contactReq);
    }
}

main();
