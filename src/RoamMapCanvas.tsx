import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { MoreHorizontal, Camera, Leaf } from 'lucide-react'

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'

/** Dense Manhattan grid — strong building extrusion coverage. */
const URBAN_CENTER: [number, number] = [-73.987742, 40.750742]

type RoamMapCanvasProps = {
  className?: string
}

export function RoamMapCanvas({ className = '' }: RoamMapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [, setMapReady] = useState(false)

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
        <button className="w-10 h-10 rounded-full bg-[#1a2b3c] flex items-center justify-center text-white shadow-lg border-0 cursor-pointer">
          <MoreHorizontal size={20} />
        </button>
        <button className="px-5 py-2 rounded-xl bg-white text-rose-500 font-bold text-sm shadow-lg border-0 cursor-pointer">
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
        <div 
          className="w-[80%] max-w-sm p-8 rounded-[32px] bg-sky-500/80 backdrop-blur-md shadow-2xl border border-white/20 flex flex-col items-center text-center space-y-3 pointer-events-auto"
        >
          <h2 className="text-4xl font-black text-white drop-shadow-lg tracking-tight m-0">
            Let&apos;s Roam
          </h2>
          <p className="text-lg font-medium text-white drop-shadow-md leading-snug m-0">
            Get outside—we&apos;ll give you something<br />to do.
          </p>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-6 inset-x-12 grid grid-cols-2 gap-4 z-20">
        <button className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-[20px] bg-[#1a2b3c]/90 backdrop-blur-md border border-white/10 shadow-2xl group cursor-pointer">
          <div className="w-8 h-8 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
            <Leaf size={18} fill="currentColor" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Explore</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-[20px] bg-[#1a2b3c]/90 backdrop-blur-md border border-white/10 shadow-2xl group cursor-pointer">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform">
            <Camera size={18} fill="currentColor" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Moment</span>
        </button>
      </div>
    </div>
  )
}
