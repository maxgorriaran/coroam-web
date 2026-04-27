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

/** Dark basemap — clean, modern urban focus. */
const MAP_STYLE =
  (import.meta.env.VITE_MAPLIBRE_STYLE_URL as string | undefined) ??
  'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'

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
    </div>
  )
}