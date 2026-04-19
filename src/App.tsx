import { useCallback, useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import {
  Sparkles,
  Navigation,
  BookOpen,
  Share2,
  Users,
  CheckCircle2,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function App() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState('')
  const [shareFeedback, setShareFeedback] = useState<string | null>(null)

  useEffect(() => {
    if (!shareFeedback) return
    const t = window.setTimeout(() => setShareFeedback(null), 2800)
    return () => window.clearTimeout(t)
  }, [shareFeedback])

  const handleShareAccess = useCallback(async () => {
    const url = window.location.href
    const shareData: ShareData = {
      title: 'CoRoam',
      text: 'Join me on the CoRoam waitlist — AI-guided walks for urban explorers.',
      url,
    }
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share(shareData)
        return
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return
    }
    try {
      await navigator.clipboard.writeText(url)
      setShareFeedback('Link copied — share it anywhere')
    } catch {
      setShareFeedback('Copy the URL from your browser’s address bar')
    }
  }, [])

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (!supabase) {
      setMessage(
        'Supabase is not configured. Copy .env.example to .env and set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
      )
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, source: 'web_premium' }])

      if (error) throw error
      setSubmitted(true)
      setEmail('')
    } catch (err: any) {
      setMessage(err.message || "Connection failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      title: "Ambient Nudges",
      desc: "Real-time AI prompts that highlight hidden architecture and local lore as you pass it.",
      icon: <Sparkles className="text-amber-400" />,
      image: "/ui-nudge.jpg"
    },
    {
      title: "Vibe-Based Curation",
      desc: "Routes tailored to your current headspace—from 'Melancholic Neon' to 'Mid-day Momentum'.",
      icon: <Navigation className="text-blue-400" />,
      image: "/ui-vibe.jpg"
    },
    {
      title: "Auto-Diary",
      desc: "Your walk is automatically turned into a rich digital journal with photos and AI insights.",
      icon: <BookOpen className="text-emerald-400" />,
      image: "/ui-diary.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-[#0a1628] text-zinc-100 selection:bg-amber-400/90 selection:text-[#0a1628] font-sans">
      {/* Cinematic Background Overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#050d18]" />
        <img 
          src="/map-bg.jpg" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/80 to-[#060f1c]" />
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-amber-400/[0.05] rounded-full blur-[130px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-sky-500/[0.05] rounded-full blur-[140px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-50 flex justify-between items-center px-6 md:px-12 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <img src="/logo-mark.png" alt="CoRoam" className="w-10 h-10 object-contain rounded-lg" />
          <div className="text-xl font-black tracking-tighter uppercase text-[#0A84FF]">COROAM</div>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-500">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#routes" className="hover:text-white transition-colors">Routes</a>
          <a href="#community" className="hover:text-white transition-colors">Community</a>
        </div>
        <button className="px-5 py-2 rounded-full border border-white/10 text-sm font-semibold hover:bg-white/[0.06] transition-all">
          Beta Access
        </button>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-16 pb-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-7"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-600/35 bg-white/[0.03] text-zinc-500 text-xs font-bold tracking-widest uppercase">
            Solo Walk Priority
          </span>
          <h1 className="text-6xl md:text-[120px] font-black tracking-tighter leading-[0.9] mb-8">
            Your City.<br /><span className="text-zinc-500">Unexplored.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            A specialized companion for the urban explorer. Premium AI guidance designed to deepen your connection with the street.
          </p>
        </motion.div>

        {/* Waitlist CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 w-full max-w-md relative z-20"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleWaitlist} 
                className="relative flex items-center p-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-xl focus-within:border-white/20 transition-all shadow-2xl"
              >
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent px-6 py-3.5 focus:outline-none text-zinc-200"
                />
                <button 
                  disabled={loading}
                  className="px-8 py-3 rounded-full bg-zinc-100 text-black font-bold hover:bg-white transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? '...' : 'Get Early Access'}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex flex-col items-center"
              >
                <CheckCircle2 size={32} className="mb-2" />
                <p className="font-bold">You're on the list.</p>
                <p className="text-sm opacity-80">Check your inbox for the welcome kit.</p>
              </motion.div>
            )}
          </AnimatePresence>
          {message && <p className="mt-4 text-xs text-red-400">{message}</p>}
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section id="features" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group flex flex-col rounded-[40px] bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all backdrop-blur-md overflow-hidden"
            >
              <div className="p-8 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.08] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
                <p className="text-zinc-500 leading-relaxed italic font-light text-sm">
                  "{f.desc}"
                </p>
              </div>
              <div className="mt-auto px-6 pb-6">
                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border border-white/5 bg-black/40">
                  <img 
                    src={f.image} 
                    alt={f.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Routes Section */}
      <section id="routes" className="relative z-10 py-32 bg-black/15 border-y border-white/[0.06] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-5xl font-black tracking-tight mb-6">Curated Routes.<br /><span className="text-zinc-600 font-light">Human Taste.</span></h2>
          <p className="text-zinc-400 max-w-2xl mx-auto font-light">
            No high-traffic tourist traps. Only the atmospheric paths hand-picked by local curators.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { city: "New York City", name: "Downtown Rim", stops: 12, tags: ["Architecture", "Harbor"], img: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=800&auto=format&fit=crop" },
            { city: "Chicago", name: "Riverwalk Loop", stops: 8, tags: ["Night", "Brutalism"], img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop" },
            { city: "Miami", name: "Venetian Glow", stops: 15, tags: ["Waterfront", "Art Deco"], img: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=800&auto=format&fit=crop" }
          ].map((route, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group relative aspect-[3/4] rounded-[40px] bg-zinc-900 border border-white/10 overflow-hidden shadow-2xl"
            >
              <img src={route.img} alt={route.name} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex gap-2 mb-3">
                  {route.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">{route.city}</p>
                <h3 className="text-2xl font-bold mb-1 italic">{route.name}</h3>
                <p className="text-zinc-500 text-sm font-light">{route.stops} Curated Stops</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-zinc-600 uppercase tracking-[0.2em] font-bold mb-6">Currently Operational In</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-zinc-400 italic">
            {["New York City", "Chicago", "Miami", "Austin", "Los Angeles", "San Francisco", "Boston", "Washington DC", "Philadelphia", "Providence"].map(city => (
              <span key={city} className="hover:text-white transition-colors cursor-default">{city}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Referral / Community */}
      <section id="community" className="relative z-10 py-40 px-6 text-center max-w-3xl mx-auto space-y-12">
        <Users className="mx-auto text-slate-600" size={48} />
        <div className="space-y-4">
          <h2 className="text-5xl font-black">Come Roam with us</h2>
          <p className="text-zinc-500 text-lg font-light">
            Refer fellow explorers and jump the queue. Every verified invite moves you 10 spots closer to the Solo Walk HUD.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleShareAccess}
            className="px-8 py-4 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:bg-zinc-100 transition-colors"
            aria-label="Share invite link"
          >
            Share Access <Share2 size={18} aria-hidden />
          </button>
          {shareFeedback && (
            <p className="text-sm text-emerald-400/90 font-medium" role="status">
              {shareFeedback}
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 p-12 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 text-sm">
        <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
          <img src="/logo-mark.png" alt="" className="w-5 h-5" />
          <div className="font-black tracking-tighter text-white uppercase">COROAM</div>
        </div>
        <div className="flex gap-8 italic font-light">
          <span>Privacy</span>
          <span>Terms</span>
          <a href="https://instagram.com/coroam.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          <a href="https://tiktok.com/@coroam.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
          <a href="https://facebook.com/coroam.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
        </div>
        <div>&copy; 2026 coroam.io. Built for the modern explorer.</div>
      </footer>
    </div>
  )
}
