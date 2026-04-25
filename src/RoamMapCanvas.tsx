import { useCallback, useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { motion } from 'framer-motion'
import { Landmark, Trees, UtensilsCrossed, Users } from 'lucide-react'
import { AmbientNudge } from './AmbientNudge'
import {
  HERALD_AREA_POIS,
  NudgeManager,
  type AmbientNudgePayload,
  type RoamVibe,
} from './lib/nudgeManager'

export type { RoamVibe as RoamCategory } from './lib/nudgeManager'

/**
 * Default: CARTO Positron — light, flat 2D basemap similar to Google Maps light (no API key).
 * Override with VITE_MAPLIBRE_STYLE_URL for another style.
 */
const MAP_STYLE =
  (import.meta.env.VITE_MAPLIBRE_STYLE_URL as string | undefined) ??
  'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

/** Dense Manhattan grid — strong building extrusion coverage. */
const URBAN_CENTER: [number, number] = [-73.987742, 40.750742]

const CATEGORIES: {
  id: RoamVibe
  label: string
  hint: string
  Icon: typeof Landmark
}[] = [
  { id: 'Historic', label: 'Historic', hint: 'Landmarks & lore', Icon: Landmark },
  { id: 'Social', label: 'Social', hint: 'Neighborhood energy', Icon: Users },
  { id: 'Nature', label: 'Nature', hint: 'Parks & green pockets', Icon: Trees },
  { id: 'Food', label: 'Food', hint: 'Tastes along the way', Icon: UtensilsCrossed },
]

type RoamMapCanvasProps = {
  className?: string
}

export function RoamMapCanvas({ className = '' }: RoamMapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [category, setCategory] = useState<RoamVibe>('Historic')
  const [roamStarted, setRoamStarted] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [ambientNudge, setAmbientNudge] = useState<AmbientNudgePayload | null>(null)
  const [ambientSequence, setAmbientSequence] = useState(0)
  const nudgeManagerRef = useRef<NudgeManager | null>(null)
  const categoryRef = useRef(category)

  const dismissAmbientNudge = useCallback(() => {
    setAmbientNudge(null)
  }, [])

  useEffect(() => {
    categoryRef.current = category
  }, [category])

  const startRoam = useCallback(() => {
    const map = mapRef.current
    if (!map) return
    setRoamStarted(true)
    map.easeTo({
      pitch: 0,
      bearing: 0,
      zoom: 17,
      duration: 1200,
      easing: (t) => 1 - Math.pow(1 - t, 2.2),
    })
  }, [])

  useEffect(() => {
    if (!roamStarted) {
      nudgeManagerRef.current?.stop()
      nudgeManagerRef.current = null
      return
    }

    const mgr = new NudgeManager({
      pois: HERALD_AREA_POIS,
      getVibe: () => categoryRef.current,
      proximityMeters: 50,
      onAmbientNudge: (payload) => {
        setAmbientSequence((s) => s + 1)
        setAmbientNudge(payload)
      },
    })
    nudgeManagerRef.current = mgr
    mgr.start()

    return () => {
      mgr.stop()
      nudgeManagerRef.current = null
    }
  }, [roamStarted])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const map = new maplibregl.Map({
      container: el,
      style: MAP_STYLE,
      center: URBAN_CENTER,
      zoom: 15.85,
      pitch: 0,
      bearing: 0,
      maxPitch: 60,
      canvasContextAttributes: { antialias: true, preserveDrawingBuffer: false },
    })

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: false }), 'top-right')
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserLocation: true,
        showAccuracyCircle: true,
      }),
      'top-right',
    )

    map.on('load', () => {
      mapRef.current = map
      setMapReady(true)
    })

    const ro = new ResizeObserver(() => map.resize())
    ro.observe(el)

    return () => {
      ro.disconnect()
      map.remove()
      mapRef.current = null
      setMapReady(false)
    }
  }, [])

  return (
    <div className={`relative isolate overflow-hidden rounded-[inherit] ${className}`}>
      <div ref={containerRef} className="absolute inset-0 h-full min-h-[320px] w-full md:min-h-0" />

      <AmbientNudge
        sequence={ambientSequence}
        nudge={ambientNudge}
        onDismiss={dismissAmbientNudge}
      />

      {/* Let's Roam — frosted drawer (web analogue of UIVisualEffectView material) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center p-4 pb-5 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: mapReady ? 1 : 0.35, y: mapReady ? 0 : 12 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto w-full max-w-md"
        >
          <div
            className={[
              'rounded-[28px] border border-white/20 p-5 shadow-[0_12px_48px_rgba(0,0,0,0.45)] md:p-6',
              'bg-white/[0.12] backdrop-blur-[44px] backdrop-saturate-[1.65]',
              'ring-1 ring-inset ring-white/10',
            ].join(' ')}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/35" aria-hidden />
            <div className="mb-5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/55">
                CoRoam Scout
              </p>
              <h2 className="mt-1.5 font-black tracking-tight text-white text-2xl md:text-[26px]">
                Let&apos;s Roam
              </h2>
              <p className="mt-2 text-[13px] leading-snug text-white/65 font-light">
                Pick a vibe — we&apos;ll bias nudges and paths toward it once you start.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {CATEGORIES.map(({ id, label, hint, Icon }) => {
                const selected = category === id
                return (
                  <button
                    key={id}
                    type="button"
                    disabled={roamStarted}
                    onClick={() => setCategory(id)}
                    className={[
                      'flex flex-col items-start gap-2 rounded-2xl border px-3.5 py-3 text-left transition-all',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                      selected
                        ? 'border-amber-400/55 bg-amber-400/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'
                        : 'border-white/12 bg-white/[0.06] hover:border-white/25 hover:bg-white/[0.1]',
                      roamStarted && !selected ? 'opacity-45' : '',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'flex h-9 w-9 items-center justify-center rounded-xl',
                        selected ? 'bg-amber-400/25 text-amber-300' : 'bg-white/10 text-white/80',
                      ].join(' ')}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span>
                      <span className="block text-[13px] font-bold text-white">{label}</span>
                      <span className="mt-0.5 block text-[11px] font-medium text-white/50">{hint}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              disabled={!mapReady || roamStarted}
              onClick={startRoam}
              className={[
                'mt-5 w-full rounded-2xl py-3.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all',
                'bg-amber-400 text-[#050A18] hover:bg-amber-300',
                'disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/40',
              ].join(' ')}
            >
              {roamStarted ? 'Roam live' : 'Start roaming'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
