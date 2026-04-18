import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  const { record } = await req.json()
  const email = record.email

  // Send email via Resend
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'CoRoam <welcome@coroam.com>',
      to: [email],
      subject: 'Welcome to the CoRoam Solo Walk Waitlist',
      html: `
        <h1>Welcome to CoRoam</h1>
        <p>You're on the list for the ultimate solo walking companion.</p>
        <p>We'll notify you as soon as an invite spot opens up.</p>
      `,
    }),
  })

  return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } })
})
