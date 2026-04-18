-- Create the waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    source TEXT DEFAULT 'web_main',
    status TEXT DEFAULT 'pending', -- pending, invited, active
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Update the waitlist table to include names and metadata
ALTER TABLE public.waitlist ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE public.waitlist ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;


-- Allow anyone to insert into the waitlist (for the landing page)
CREATE POLICY "Enable insert for everyone" ON public.waitlist
    FOR INSERT WITH CHECK (true);

-- Allow service role or authenticated admins to view/manage
CREATE POLICY "Allow admins to view" ON public.waitlist
    FOR SELECT TO authenticated USING (auth.jwt() ->> 'role' = 'service_role');

-- Optional: after new waitlist rows, call an Edge Function or external URL.
-- Do NOT use supabase_functions.http_request here — it is not available on all projects
-- and triggers localhost URLs. Instead use:
--   Supabase Dashboard → Database → Webhooks (table: waitlist, event: INSERT), or
--   deploy supabase/functions/send-invite and point the webhook at your project URL.
