const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    const services = [
        {
            slug: 'baustellenreinigung',
            title: 'Baustellen & Bauendreinigung',
            category: 'Reinigung',
            description: 'Professionelle Reinigung vor, während und nach Bauarbeiten – von der Grobreinigung bis zur fachgerechten Bauendreinigung für eine bezugsfertige Übergabe.',
            image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMhek8IvTZAlzVLZM9s1BBc6IsdT4FI-fvof3wcDfNpAPepIrMtxrAnJIpvNbtEX3dj9pL64CpbYz5SqAK2l5iRQsICZRDi34EG11rW_-iqUwLw-sc3bYyF77NBLLu5_zkdmi7QooBkdPoMwPnET8e9qOWXu9NgCvc2Fo_IGmo_GjsGt9Kp9sLImSHuLsokrUZvvrfKhPv0Ah4QGApJ4qpXh0g7930DZgelbrnY-hY3Pr-PrAfknjTZDkoCzRnlWYuGf_1Z2J7ajQ',
            price: 'Auf Anfrage',
            features: JSON.stringify(['Baugrobreinigung', 'Bauzwischenreinigung', 'Fachgerechte Bauendreinigung'])
        },
        {
            slug: 'fahrzeugueberfuehrung',
            title: 'Fahrzeugüberführung',
            category: 'Transport',
            description: 'Zuverlässige Fahrzeugtransporte zwischen Städten – sicher, termingerecht und professionell organisiert.',
            image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnGPSh4iHSxh6uPvbjfYn1-cicRbq2FcdmHDqthUSQnGj-grKaZEgwZPyl67f6fBq2Q-6eZVZoaRYLbr-VZRz6Vu13GCZOwPndhoCCIaECC_POsgK0d3nzDfGUcI2cn9vi0iVz1zn7pjlPW2oA37QuEYNLyo3t_UjmWL5C1rEYTPBm4SWcsgjkZXrcn_Lr9BJEudR6fa8GCor0aPrS0koCQYdvwnAPo4QYM3lBZuANkqrNbAQdx7m2_F2TdRlTMvsoP7pzrkXceG8',
            price: 'Ab 150€',
            features: JSON.stringify(['Sicherer Transport', 'Termingerechte Lieferung', 'Deutschlandweiter Service'])
        },
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

    const testimonials = [
        {
            name: "Thomas Weber",
            title: "CEO, TechVision GmbH",
            quote: "Die Zusammenarbeit mit RI Service hat unsere Erwartungen übertroffen. Die Professionalität und das Engagement des Teams sind einzigartig in der Branche.",
            status: "approved"
        },
        {
            name: "Sabine Müller",
            title: "Facility Managerin, BuildPro",
            quote: "Zuverlässige und gründliche Gebäudereinigung. Seit wir mit RI Service zusammenarbeiten, glänzen unsere Büros wieder. Absolut empfehlenswert!",
            status: "approved"
        },
        {
            name: "Klaus Wagner",
            title: "Fuhrparkleiter, AutoLogistics",
            quote: "Unsere Fahrzeugüberführungen laufen dank RI Service immer reibungslos, pünktlich und extrem sicher ab. Ein echter Premium-Partner.",
            status: "approved"
        },
        {
            name: "Alex Johnson",
            title: "Architekt, Modern Construct",
            quote: "Die Bauendreinigung wurde schnell und sehr gründlich durchgeführt. Wir konnten pünktlich an den Kunden übergeben.",
            status: "pending"
        }
    ];

    const feedbacks = [
        {
            rating: 5,
            first_name: "John",
            last_name: "Doe",
            company_name: "Doe Inc.",
            feedback_text: "Great service, very professional."
        },
        {
            rating: 4,
            first_name: "Jane",
            last_name: "Smith",
            company_name: "Smith LLC",
            feedback_text: "Good job, minor delays but overall satisfactory."
        }
    ];

    const contact_requests = [
        {
            first_name: "Alice",
            last_name: "Wonderland",
            company_name: "Magic Corp",
            email: "alice@example.com",
            phone: "+123456789",
            service_interest: "gebaeudereinigung",
            message: "Looking for a quote for cleaning services.",
            accepted_terms: true
        }
    ];

    console.log("Inserting services...");
    for (const service of services) {
        await supabase.from('services').upsert(service, { onConflict: 'slug' });
    }

    console.log("Inserting testimonials...");
    for (const test of testimonials) {
        await supabase.from('testimonials').insert(test);
    }

    console.log("Inserting feedbacks...");
    for (const feedback of feedbacks) {
        await supabase.from('feedback').insert(feedback);
    }

    console.log("Inserting contact requests...");
    for (const req of contact_requests) {
        await supabase.from('contact_requests').insert(req);
    }

    console.log("Done.");
}

seed().catch(console.error);
