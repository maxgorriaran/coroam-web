export type RoamVibe = 'Historic' | 'Social' | 'Nature' | 'Food'

export type VibePoi = {
  id: string
  name: string
  lat: number
  lng: number
  vibes: RoamVibe[]
}

export type AmbientNudgePayload = {
  poiId: string
  title: string
  subtitle?: string
}

/** Sample POIs around the Herald Square demo map — real GPS in this area can trigger nudges. */
export const HERALD_AREA_POIS: VibePoi[] = [
  {
    id: 'msq',
    name: 'Main Post Office · Moynihan',
    lat: 40.7494,
    lng: -73.9949,
    vibes: ['Historic', 'Social'],
  },
  {
    id: 'bryant',
    name: 'Bryant Park lawn',
    lat: 40.7536,
    lng: -73.9832,
    vibes: ['Nature', 'Social', 'Historic'],
  },
  {
    id: 'ktown',
    name: 'Koreatown food corridor',
    lat: 40.7479,
    lng: -73.9865,
    vibes: ['Food', 'Social'],
  },
  {
    id: 'library',
    name: 'NYPL Schwarzman Building',
    lat: 40.7532,
    lng: -73.9822,
    vibes: ['Historic', 'Social'],
  },
  {
    id: 'herald-park',
    name: 'Greeley Square pocket park',
    lat: 40.7489,
    lng: -73.9881,
    vibes: ['Nature', 'Social'],
  },
]

function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6_371_000
  const toRad = (d: number) => (d * Math.PI) / 180
  const φ1 = toRad(lat1)
  const φ2 = toRad(lat2)
  const Δφ = toRad(lat2 - lat1)
  const Δλ = toRad(lon2 - lon1)
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export type NudgeManagerOptions = {
  pois: VibePoi[]
  /** Latest roam vibe (called on each location tick). */
  getVibe: () => RoamVibe
  onAmbientNudge: (payload: AmbientNudgePayload) => void
  /** Default 50m */
  proximityMeters?: number
  /** Suppress repeat nudges for the same POI (default 90s). */
  cooldownPerPoiMs?: number
  geolocation?: Pick<Geolocation, 'watchPosition' | 'clearWatch'>
}

/**
 * Listens to device location + selected vibe, evaluates proximity to tagged POIs,
 * and invokes `onAmbientNudge` when the user enters the proximity radius.
 */
export class NudgeManager {
  private pois: VibePoi[]
  private getVibe: () => RoamVibe
  private readonly proximityM: number
  private readonly onNudge: (payload: AmbientNudgePayload) => void
  private readonly cooldownMs: number
  private readonly geo: NudgeManagerOptions['geolocation']

  private watchId: number | null = null
  private lastNudgeAt = new Map<string, number>()

  constructor(opts: NudgeManagerOptions) {
    this.pois = opts.pois
    this.getVibe = opts.getVibe
    this.proximityM = opts.proximityMeters ?? 50
    this.onNudge = opts.onAmbientNudge
    this.cooldownMs = opts.cooldownPerPoiMs ?? 90_000
    this.geo = opts.geolocation ?? (typeof navigator !== 'undefined' ? navigator.geolocation : undefined)
  }

  setPois(pois: VibePoi[]): void {
    this.pois = pois
  }

  start(): void {
    this.stop()
    if (!this.geo?.watchPosition) return

    this.watchId = this.geo.watchPosition(
      (pos) => {
        this.checkProximityAndNotify(pos.coords.latitude, pos.coords.longitude)
      },
      () => {
        /* permission denied / unavailable — silent; UI may prompt elsewhere */
      },
      { enableHighAccuracy: true, maximumAge: 12_000, timeout: 20_000 },
    )
  }

  stop(): void {
    if (this.watchId != null && this.geo?.clearWatch) {
      this.geo.clearWatch(this.watchId)
    }
    this.watchId = null
  }

  /**
   * Evaluates distance to vibe-matching POIs and fires at most one ambient nudge
   * per call (closest match wins). Safe to call from tests or a custom location stream.
   */
  checkProximityAndNotify(lat: number, lng: number): void {
    const vibe = this.getVibe()
    const now = Date.now()
    const candidates: { poi: VibePoi; d: number }[] = []

    for (const poi of this.pois) {
      if (!poi.vibes.includes(vibe)) continue
      const d = haversineMeters(lat, lng, poi.lat, poi.lng)
      if (d > this.proximityM) continue
      const last = this.lastNudgeAt.get(poi.id) ?? 0
      if (now - last < this.cooldownMs) continue
      candidates.push({ poi, d })
    }

    if (candidates.length === 0) return
    candidates.sort((a, b) => a.d - b.d)
    const { poi } = candidates[0]!
    this.lastNudgeAt.set(poi.id, now)
    this.onNudge({
      poiId: poi.id,
      title: poi.name,
      subtitle: vibe,
    })
  }
}
