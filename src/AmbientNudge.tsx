import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { AmbientNudgePayload } from './lib/nudgeManager'

type AmbientNudgeProps = {
  nudge: AmbientNudgePayload | null
  /** Bump when a new nudge fires so repeat POIs re-animate. */
  sequence: number
  /** Visible time before auto fade (ms). */
  dwellMs?: number
  onDismiss: () => void
}

/**
 * Minimal ambient toast: fades in softly, auto-dismisses if ignored, dismisses immediately on tap.
 */
export function AmbientNudge({ nudge, sequence, dwellMs = 4_400, onDismiss }: AmbientNudgeProps) {
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (dismissTimer.current != null) {
      clearTimeout(dismissTimer.current)
      dismissTimer.current = null
    }
  }, [])

  const dismiss = useCallback(() => {
    clearTimer()
    onDismiss()
  }, [clearTimer, onDismiss])

  useEffect(() => {
    if (!nudge) return
    clearTimer()
    dismissTimer.current = setTimeout(dismiss, dwellMs)
    return clearTimer
  }, [nudge, dwellMs, dismiss, clearTimer])

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[25] flex justify-center pt-5 px-4">
      <AnimatePresence mode="wait">
        {nudge ? (
          <motion.button
            key={`${sequence}-${nudge.poiId}`}
            type="button"
            layout
            role="status"
            aria-live="polite"
            aria-atomic="true"
            initial={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(2px)' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            onClick={dismiss}
            className={[
              'pointer-events-auto max-w-sm cursor-pointer rounded-full border border-white/15',
              'bg-zinc-950/55 px-4 py-2.5 text-left shadow-lg backdrop-blur-md backdrop-saturate-150',
              'ring-1 ring-inset ring-white/10 transition-colors hover:bg-zinc-950/70',
            ].join(' ')}
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/45">
              Ambient nudge
            </p>
            <p className="mt-0.5 text-[13px] font-medium leading-snug tracking-tight text-white/95">
              {nudge.title}
            </p>
            {nudge.subtitle ? (
              <p className="mt-0.5 text-[11px] text-white/40">{nudge.subtitle}</p>
            ) : null}
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
