-- Create services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    price TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    title TEXT,
    quote TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    company_name TEXT,
    feedback_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contact requests table
CREATE TABLE public.contact_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT,
    company_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    service_interest TEXT,
    message TEXT NOT NULL,
    accepted_terms BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Allow public read access to services
CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);

-- Allow public read access to approved testimonials
CREATE POLICY "Allow public read approved testimonials" ON public.testimonials FOR SELECT USING (status = 'approved');

-- Allow public to insert a new testimonial (e.g. from the website directly)
CREATE POLICY "Allow public insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (true);

-- Allow public to submit feedback
CREATE POLICY "Allow public insert feedback" ON public.feedback FOR INSERT WITH CHECK (true);

-- Allow public to submit contact requests
CREATE POLICY "Allow public insert contact requests" ON public.contact_requests FOR INSERT WITH CHECK (true);

-- Note: In a real app, an Admin policy would be needed for UPDATE/DELETE,
-- but accessing via the Service Role Key in Next.js API routes bypasses RLS.
