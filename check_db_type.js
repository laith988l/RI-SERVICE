const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkServices() {
    const { data: services, error } = await supabase
        .from('services')
        .select('id, title, features')
        .limit(1);

    if (error) {
        console.error('Error fetching services:', error);
        return;
    }

    console.log(services);
    console.log("Type of features:", typeof services[0].features);
    console.log("Is array?", Array.isArray(services[0].features));
}

checkServices();
