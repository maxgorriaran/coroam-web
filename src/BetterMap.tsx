import { motion } from 'framer-motion'
import { Sparkles, Map as MapIcon, Share2, Compass, BookOpen, CheckCircle2, Navigation } from 'lucide-react'

export function BetterMap() {
  return (
    <div className="min-h-screen bg-[#050A18] text-zinc-100 selection:bg-amber-400/90 selection:text-[#050A18] font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <div className="flex-1 flex items-center gap-3">
          <img src="/coroam-wordmark-new.png" alt="CoRoam" className="h-10 object-contain" />
        </div>
        <div className="hidden md:flex flex-1 justify-center gap-8 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
          <a href="#better-map" className="text-white">The Map</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#routes" className="hover:text-white transition-colors">Routes</a>
          <a href="#community" className="hover:text-white transition-colors">Community</a>
        </div>
        <div className="flex-1 flex justify-end gap-6 items-center">
            <a href="/" className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Login</a>
            <button className="px-6 py-2 rounded-full border border-white/20 text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                Get Early Access
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
            <button className="px-8 py-4 rounded-full bg-amber-400 text-[#050A18] font-black text-xs uppercase tracking-widest hover:bg-amber-300 transition-all">
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
            {/* Actual Map Graphic */}
            <img 
              src="/scout-map-preview.jpg" 
              className="absolute inset-0 w-full h-full object-cover opacity-60" 
              alt="CoRoam Scout Map Discovery View"
            />
            
            {/* The Route Path Graphic Overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-60">
                <path d="M100,500 Q250,400 400,450 T650,350" fill="none" stroke="#FFB703" strokeWidth="3" strokeDasharray="12 12" />
                <circle cx="100" cy="500" r="6" fill="#FFB703" className="animate-pulse" />
            </svg>

            {/* Floating UI Annotations (The CoLab Style) */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] right-[10%] p-4 bg-white rounded-2xl shadow-2xl w-64 text-zinc-900 space-y-2 z-20"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-zinc-200" />
                <span className="text-[10px] font-bold">Sarah K. | 0.2mi Away</span>
                <span className="ml-auto px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600 text-[8px] font-black uppercase tracking-tighter">Active</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-tight">"Just found a hidden courtyard behind the library. The vibe is immaculate."</p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[25%] left-[15%] p-4 bg-white rounded-2xl shadow-2xl w-56 text-zinc-900 space-y-2 z-20"
            >
               <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-amber-400 flex items-center justify-center text-black font-black text-[8px]">C</div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Neural Nudge</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-tight">Architecture Alert: This building was a secret jazz club in the 1920s.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* How It Works - Descriptive Section under the Map */}
      <section className="relative z-10 py-24 px-6 bg-[#0A1128]/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-black uppercase tracking-tighter">How it works</h2>
            <p className="text-xl text-zinc-400 font-light leading-relaxed">
              Standard maps are for arriving. CoRoam is for roaming. Our engine analyzes city data in real-time to curate a path that prioritizes atmosphere over efficiency. As you move, the map scouts 150m ahead, prepping neural nudges that surface the neighborhood's deepest secrets.
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

      {/* Footer */}
      <footer className="relative z-10 p-12 text-center border-t border-white/5">
        <div className="text-zinc-700 text-[10px] font-bold uppercase tracking-[0.4em]">
          CoRoam &copy; 2026. Built for the modern explorer.
        </div>
      </footer>
    </div>
  )
}
