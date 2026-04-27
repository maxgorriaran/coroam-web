import { useCallback, useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { motion } from 'framer-motion'
import { Landmark, Trees, UtensilsCrossed, Users, MoreHorizontal, Camera, Leaf } from 'lucide-react'
import { AmbientNudge } from './AmbientNudge'
import {
  HERALD_AREA_POIS,
  NudgeManager,
  type AmbientNudgePayload,
  type RoamVibe,
} from './lib/nudgeManager'

export type { RoamVibe as RoamCategory } from './lib/nudgeManager'

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'

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

      {/* Top Controls Overlay */}
      <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
        <button className="w-10 h-10 rounded-full bg-[#1a2b3c] flex items-center justify-center text-white shadow-lg">
          <MoreHorizontal size={20} />
        </button>
        <button className="px-5 py-2 rounded-xl bg-white text-rose-500 font-bold text-sm shadow-lg">
          End
        </button>
      </div>

      {/* Center Stats Pill */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-white/95 backdrop-blur-sm px-6 py-2.5 rounded-full shadow-xl flex items-center gap-3 border border-black/5">
          <span className="text-zinc-800 font-bold text-sm tracking-tight">0:00</span>
          <div className="w-px h-3 bg-zinc-300" />
          <span className="text-zinc-800 font-bold text-sm tracking-tight">0 ft</span>
        </div>
      </div>

      {/* Let's Roam Overlay Card */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-[90%] max-w-md p-10 rounded-[40px] bg-sky-500/80 backdrop-blur-md shadow-2xl border border-white/20 flex flex-col items-center text-center space-y-4 pointer-events-auto"
        >
          <h2 className="text-5xl font-black text-white drop-shadow-lg tracking-tight">
            Let&apos;s Roam
          </h2>
          <p className="text-xl font-medium text-white drop-shadow-md leading-snug">
            Get outside—we&apos;ll give you something<br />to do.
          </p>
        </motion.div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-8 inset-x-8 grid grid-cols-2 gap-4 z-20">
        <button className="flex flex-col items-center justify-center gap-2 py-4 rounded-[24px] bg-[#1a2b3c]/90 backdrop-blur-md border border-white/10 shadow-2xl group">
          <div className="w-10 h-10 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
            <Leaf size={22} fill="currentColor" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Explore</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 py-4 rounded-[24px] bg-[#1a2b3c]/90 backdrop-blur-md border border-white/10 shadow-2xl group">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform">
            <Camera size={22} fill="currentColor" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Moment</span>
        </button>
      </div>
    </div>
  )
}
