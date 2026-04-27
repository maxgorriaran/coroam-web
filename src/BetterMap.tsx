import { motion } from 'framer-motion'
import { Sparkles, Share2, Navigation } from 'lucide-react'
import { RoamMapCanvas } from './RoamMapCanvas'

export function BetterMap() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-zinc-100 selection:bg-amber-400/90 selection:text-[#0a1628] font-sans overflow-x-hidden">
      {/* Nav — matches landing (App.tsx) */}
      <nav className="relative z-50 flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
        <div className="flex-1 flex items-center gap-3 min-w-0">
          <img src="/logo-mark.png" alt="" className="w-10 h-10 object-contain rounded-lg shrink-0" />
          <img src="/coroam-wordmark-new.png" alt="CoRoam" className="h-44 object-contain" />
        </div>
        <div className="hidden md:flex flex-1 justify-center gap-8 text-sm font-medium text-zinc-500">
          <a href="#better-map" className="hover:text-white transition-colors">
            The Map
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#routes" className="hover:text-white transition-colors">
            Routes
          </a>
          <a href="#community" className="hover:text-white transition-colors">
            Community
          </a>
        </div>
        <div className="flex-1 flex justify-end">
          <button
            type="button"
            className="px-5 py-2 rounded-full border border-white/10 text-sm font-semibold hover:bg-white/[0.06] transition-all"
          >
            Beta Access
          </button>
        </div>
      </nav>

      {/* Hero Section - Split Screen Layout */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-32 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left space-y-8 max-w-xl"
        >
          <h1 className="text-5xl md:text-[88px] font-black tracking-tighter leading-[0.9] text-white">
            Walk to roam,<br />not just to reach.
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
            Stop being a blue dot on a line. CoRoam is the map that optimizes for discovery, not just speed. Experience neural nudges toward the city's best hidden gems.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => window.location.hash = '#membership'}
              className="px-8 py-4 rounded-full bg-amber-400 text-[#050A18] font-black text-xs uppercase tracking-widest hover:bg-amber-300 transition-all"
            >
              View Live Map
            </button>
            <button className="px-8 py-4 rounded-full border border-white/20 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
              How it works
            </button>
          </div>
        </motion.div>

        {/* Right: Technical Graphic */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative aspect-square md:aspect-auto md:h-[600px] w-full"
        >
          <div className="absolute inset-0 bg-[#0A1128] rounded-[60px] border border-white/5 overflow-hidden shadow-2xl">
            <RoamMapCanvas className="h-full min-h-[320px] md:min-h-0" />
          </div>
        </motion.div>
      </section>

      {/* How It Works - Descriptive Section under the Map */}
      <section className="relative z-10 py-24 px-6 bg-[#0A1128]/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-black uppercase tracking-tighter">How it works</h2>
            <p className="text-xl text-zinc-400 font-light leading-relaxed">
              When you open the app, you land on our Let&apos;s Roam flow to get your roam started. Before you head out, you pick the kind of walk you want—a historic walk, a social walk, nature, or food. From there, nudges can guide you along the way whenever you choose to lean into those vibes. Mid-roam, you can also steer toward specific paths—for example, more food spots—if you want fresh options. Along the route you can add photos and notes, then wrap up with a summary of how the walk felt.
            </p>
        </div>
      </section>

      {/* Benefits Section - 3 Columns */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 flex items-center justify-center">
              <Sparkles className="text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold">Neural Nudges</h3>
            <p className="text-zinc-500 font-light leading-relaxed italic">"Our AI doesn't just give directions; it suggests 'detours of interest' based on local lore and atmospheric beauty."</p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <Navigation className="text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold">Better Navigation</h3>
            <p className="text-zinc-500 font-light leading-relaxed italic">"Stop being a blue dot on a line. A map that optimizes for your experience, not just your arrival."</p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 flex items-center justify-center">
              <Share2 className="text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold">Share the Path</h3>
            <p className="text-zinc-500 font-light leading-relaxed italic">"Every roam is captured in a beautiful shareable card. Document the hidden gems you find and post them."</p>
          </div>
        </div>
      </section>

      {/* Partner/Social Proof Bar */}
      <div className="relative z-10 py-12 border-t border-white/5 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all overflow-hidden whitespace-nowrap px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-12 font-black uppercase tracking-[0.3em] text-[10px]">
          <span>App Store Best of 2026</span>
          <span>Wired Magazine</span>
          <span>TechCrunch</span>
          <span>Urban Explorer Weekly</span>
          <span>Vogue Discovery</span>
        </div>
      </div>

      {/* Footer — matches landing (App.tsx) */}
      <footer className="relative z-10 p-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center gap-8 text-slate-400 text-sm">
        <div className="flex-1 flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all min-w-0">
          <img src="/logo-mark.png" alt="" className="w-5 h-5 shrink-0" />
          <img src="/coroam-wordmark-new.png" alt="CoRoam" className="h-44 object-contain" />
        </div>
        <div className="flex-1 flex justify-center flex-wrap gap-8 italic font-light">
          <a href="#privacy" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#terms" className="hover:text-white transition-colors">
            Terms
          </a>
          <a
            href="https://instagram.com/coroam.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://tiktok.com/@coroam.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            TikTok
          </a>
          <a
            href="https://facebook.com/coroam.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Facebook
          </a>
        </div>
        <div className="flex-1 flex justify-end text-right">&copy; 2026 coroam.io. Built for the modern explorer.</div>
      </footer>
    </div>
  )
}
