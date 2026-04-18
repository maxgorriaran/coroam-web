-- Create the waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    source TEXT DEFAULT 'web_main',
    status TEXT DEFAULT 'pending', -- pending, invited, active
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert into the waitlist (for the landing page)
CREATE POLICY "Enable insert for everyone" ON public.waitlist
    FOR INSERT WITH CHECK (true);

-- Allow service role or authenticated admins to view/manage
CREATE POLICY "Allow admins to view" ON public.waitlist
    FOR SELECT TO authenticated USING (auth.jwt() ->> 'role' = 'service_role');

-- Optional: Function to auto-send invite via Edge Function hook
-- After deploying the Edge Function 'send-invite', run this to link it to the table:
CREATE OR REPLACE TRIGGER on_waitlist_insert
  AFTER INSERT ON public.waitlist
  FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request(
    'http://localhost:54321/functions/v1/send-invite',
    'POST',
    '{"Content-Type":"application/json"}',
    '{}',
    '1000'
  );

