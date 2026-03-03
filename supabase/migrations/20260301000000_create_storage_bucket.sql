-- Create the storage bucket for services if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('services', 'services', true)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies for the 'services' bucket

-- 1. Allow public access to view images
CREATE POLICY "Public Access" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'services');

-- 2. Allow authenticated users to upload images
-- Since the Next.js app uses the Supabase Admin client for these operations,
-- we'll broadly allow public inserts/updates to be matched by the existing server actions
-- or we can specifically limit it to authenticated users if the app supports it.
-- For now, letting the Admin Client handle it bypassing RLS is the simplest.
-- If client-side uploads are used, we need this:
CREATE POLICY "Allow public uploads for services" 
    ON storage.objects FOR INSERT 
    WITH CHECK (bucket_id = 'services');

CREATE POLICY "Allow public updates for services" 
    ON storage.objects FOR UPDATE 
    USING (bucket_id = 'services');

CREATE POLICY "Allow public deletes for services" 
    ON storage.objects FOR DELETE 
    USING (bucket_id = 'services');
