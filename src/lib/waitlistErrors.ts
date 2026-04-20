/** PostgREST / Supabase errors are often plain objects; unwrap one level of nesting. */
function extractPostgrestLike(err: unknown): {
  code?: string
  message?: string
  details?: string
} {
  if (err === null || typeof err !== 'object') return {}
  const o = err as Record<string, unknown>
  const inner =
    o.error && typeof o.error === 'object'
      ? (o.error as Record<string, unknown>)
      : o
  return {
    code: typeof inner.code === 'string' ? inner.code : undefined,
    message: typeof inner.message === 'string' ? inner.message : undefined,
    details: typeof inner.details === 'string' ? inner.details : undefined,
  }
}

/**
 * Detect Postgres unique_violation (23505) from Supabase/PostgREST insert errors,
 * e.g. duplicate normalized email on `waitlist`.
 */
export function isUniqueConstraintViolation(err: unknown): boolean {
  const { code, message, details } = extractPostgrestLike(err)
  const combined = [message, details].filter(Boolean).join('\n')
  if (code === '23505') return true
  if (/duplicate key|unique constraint|already exists/i.test(combined)) return true
  return false
}

/** Prefer API message over the vague fallback (some environments throw non-Error objects). */
export function getWaitlistErrorMessage(err: unknown): string {
  const { message, details } = extractPostgrestLike(err)
  const fromApi = [message, details].filter(Boolean).join(' — ')
  if (fromApi.trim()) return fromApi.trim()
  if (err instanceof Error && err.message.trim()) return err.message.trim()
  return 'Couldn’t save your email. Check your connection and try again.'
}
