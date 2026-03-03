const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const missingServices = [
    {
        slug: 'gebaeudereinigung',
        title: 'Gebäudereinigung',
        category: 'Reinigung',
        description: 'Professionelle Reinigung für Büros und Gewerbeobjekte mit strukturierten Abläufen und sorgfältiger Ausführung.',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzVeZcYUnW8VZAS0DA9o02mqv1Pg813mjuxW_t0LpfefhfOo_I0NdJo0zmCBusbq89YE9sDVEUZ8oFLTK0Wi0Fowk7tyVUVtBzweJqWk2BeFrKtfh6po674Nmu0Jlx546tXKzKK08pJGlOcDRWz8AA6b_k_OkphEktPpMWHcm5KmsjXn-9Wp_vFdcBGdLpbTHzPByrXEO9RiIW5-g7IBtlflBUkruVwnO3q67JPl2OITE649xZBOmNqNBNQCGQ9AoEXt-HCXk9AdM',
        price: 'Auf Anfrage',
        features: JSON.stringify(['Büroreinigung', 'Unterhaltsreinigung', 'Gewerbeobjekte'])
    },
    {
        slug: 'hausmeisterservice',
        title: 'Hausmeisterservice',
        category: 'Betreuung',
        description: 'Regelmäßige Objektbetreuung und zuverlässige Unterstützung für Wohn- und Gewerbeimmobilien.',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCNr5vnQGbosMHVhnXVLaANinBZdqa7CY0gLTLVxMAn3NZLpgrGdHukc6UtzUyPa4lj8807pYhMYGNuxtDqIaCQ-2GSBoReCLwhc9bdMj53vBDS4nEM89gycm12bmynQci4uhn8Ksb-sHAsj7gx_Br_AK9zdXrOEa5NwCABw6TnnukKV4dUId-_h9oz_yw4084v_zZkCbfiicXGfJ4RMF7dsGylFJNkYsBDvoVIPpj6__kYM54E9Z8vD9Rg6sa9tyOpAqmHnnx9ZY',
        price: 'Ab 50€/Std',
        features: JSON.stringify(['Regelmäßige Objektbetreuung', 'Kleinere Reparaturen', 'Zuverlässige Instandhaltung'])
    }
];

async function addMissingServices() {
    console.log("Inserting missing services...");
    let successCount = 0;

    for (const service of missingServices) {
        const { error } = await supabase.from('services').upsert(service, { onConflict: 'slug' });

        if (error) {
            console.error(`Failed to insert ${service.title}:`, error);
        } else {
            console.log(`Successfully added: ${service.title}`);
            successCount++;
        }
    }

    console.log(`Finished. Successfully added ${successCount} out of ${missingServices.length} missing services.`);
}

addMissingServices().catch(console.error);
