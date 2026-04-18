import { useState } from 'react'
import { supabase } from './lib/supabase'
import { 
  MapPin, 
  Shield, 
  Sparkles, 
  Send, 
  Navigation, 
  Ghost, 
  BookOpen, 
  Share2, 
  Users, 
  ArrowRight,
  ChevronRight,
  CheckCircle2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function App() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState('')

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

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
      icon: <Sparkles className="text-amber-400" />
    },
    {
      title: "Vibe-Based Curation",
      desc: "Routes tailored to your current headspace—from 'Melancholic Neon' to 'Mid-day Momentum'.",
      icon: <Navigation className="text-blue-400" />
    },
    {
      title: "Auto-Diary",
      desc: "Your walk is automatically turned into a rich digital journal with photos and AI insights.",
      icon: <BookOpen className="text-emerald-400" />
    }
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-amber-400 selection:text-black font-sans">
      {/* Cinematic Background Overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
      </div>

      {/* Nav */}
      <nav className="relative z-50 flex justify-between items-center px-6 md:px-12 py-8 max-w-7xl mx-auto">
        <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full" />
          </div>
          COROAM
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-500">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#routes" className="hover:text-white transition-colors">Routes</a>
          <a href="#community" className="hover:text-white transition-colors">Community</a>
        </div>
        <button className="px-5 py-2 rounded-full border border-zinc-800 text-sm font-semibold hover:bg-zinc-900 transition-all">
          Beta Access
        </button>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-24 pb-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-xs font-bold tracking-widest uppercase">
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
                className="relative flex items-center p-1 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl focus-within:border-zinc-600 transition-all shadow-2xl"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-[40px] bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
              <p className="text-zinc-500 leading-relaxed italic font-light">
                "{f.desc}"
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Routes Section */}
      <section id="routes" className="relative z-10 py-32 bg-zinc-900/10 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-black tracking-tight">Curated Routes.<br /><span className="text-zinc-600 font-light">Human Taste.</span></h2>
            <p className="text-zinc-400 leading-relaxed text-lg font-light">
              CoRoam maps are hand-picked by local curators who understand the poetry of a city. No high-traffic tourist traps. Only the atmospheric paths.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                San Juan 'Old World' Drift
              </div>
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Austin 'Neon Brutalism' Trek
              </div>
              <button className="flex items-center gap-2 text-white font-bold group pt-4">
                Explore Maps <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="relative aspect-square rounded-[60px] bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl group">
             <div className="absolute inset-0 bg-gradient-to-tr from-black to-zinc-800 opacity-60" />
             <div className="absolute inset-0 flex items-center justify-center">
                <Navigation size={64} className="text-zinc-700 group-hover:scale-110 transition-transform duration-700" />
             </div>
             {/* Map Overlay Simulation */}
             <div className="absolute bottom-8 left-8 right-8 p-6 rounded-3xl bg-zinc-900/90 border border-white/5 backdrop-blur-xl">
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">Active Route</p>
                <p className="text-lg font-bold italic">The Silent Promenade</p>
             </div>
          </div>
        </div>
      </section>

      {/* Referral / Community */}
      <section id="community" className="relative z-10 py-40 px-6 text-center max-w-3xl mx-auto space-y-12">
        <Users className="mx-auto text-zinc-800" size={48} />
        <div className="space-y-4">
          <h2 className="text-5xl font-black">Move Together, Alone.</h2>
          <p className="text-zinc-500 text-lg font-light">
            Refer fellow explorers and jump the queue. Every verified invite moves you 10 spots closer to the Solo Walk HUD.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 rounded-full bg-white text-black font-bold flex items-center gap-2">
            Share Access <Share2 size={18} />
          </button>
          <button className="px-8 py-4 rounded-full border border-zinc-800 text-zinc-400 font-bold hover:bg-zinc-900 transition-all">
            Join the Discord
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 p-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-500 text-sm">
        <div className="font-black tracking-tighter text-white">COROAM</div>
        <div className="flex gap-8 italic font-light">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Instagram</span>
        </div>
        <div>&copy; 2026 Built for the modern explorer.</div>
      </footer>
    </div>
  )
}
