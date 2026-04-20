import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/** Browser client only — use the anon key, never the service role. */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

function isValidHttpUrl(url: string): boolean {
  try {
    const u = new URL(url)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Null when env is missing or invalid.
 * `createClient` throws if the URL is non-empty but not a real http(s) URL (e.g. copy-pasted
 * placeholders like `your_supabase_project_url`) — that used to kill the whole bundle at import.
 */
export const supabase: SupabaseClient | null =
  supabaseUrl &&
  supabaseAnonKey &&
  isValidHttpUrl(supabaseUrl)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

if (
  import.meta.env.DEV &&
  supabaseUrl &&
  supabaseAnonKey &&
  !isValidHttpUrl(supabaseUrl)
) {
  console.warn(
    '[coroam] VITE_SUPABASE_URL must be a full URL (e.g. https://xxxx.supabase.co), not a placeholder string.'
  )
}
