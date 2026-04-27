import { motion } from 'framer-motion'
import { Check, ArrowLeft } from 'lucide-react'

export function Membership() {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      description: 'Roam longer, save everything, and get richer context when it matters.',
      features: [
        'Solo roams and core navigation',
        '3 roams per week quota',
        'Browse all curated routes',
        'Flash-Lite companion guidance',
        'MapKit-first POIs'
      ],
      cta: 'Start Roaming',
      highlight: false
    },
    {
      name: 'Premium',
      price: '$6.99',
      description: 'The full atmospheric experience with unlimited roam time.',
      features: [
        'Unlimited roam time and route starts',
        'Unlimited saved roams and memories',
        'Adaptive AI companion guidance',
        'Hybrid Places & richer context',
        'Deeper vibe personalization',
        'Premium recap polish & insights',
        'Special drops and themed roams'
      ],
      cta: 'Go Premium',
      highlight: true
    }
  ]

  return (
    <div className="min-h-screen bg-[#0a1628] text-zinc-100 font-sans selection:bg-amber-400/90 selection:text-[#0a1628]">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-amber-400/[0.03] rounded-full blur-[130px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-sky-500/[0.03] rounded-full blur-[140px]" />
      </div>

      <nav className="relative z-50 flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
        <div className="flex-1 flex items-center gap-3 cursor-pointer" onClick={() => window.location.hash = ''}>
          <img src="/logo-mark.png" alt="" className="w-10 h-10 object-contain rounded-lg" />
          <img src="/coroam-wordmark-new.png" alt="CoRoam" className="h-44 object-contain" />
        </div>
        <div className="hidden md:flex flex-1 justify-center gap-8 text-sm font-medium text-zinc-500">
          <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }} className="hover:text-white transition-colors">Home</a>
          <a href="#better-map" className="hover:text-white transition-colors">The Map</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
        </div>
        <div className="flex-1 flex justify-end">
          <button 
            onClick={() => window.location.hash = '#better-map'}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 text-sm font-semibold hover:bg-white/[0.06] transition-all text-zinc-400 hover:text-white"
          >
            <ArrowLeft size={14} /> Back to Map
          </button>
        </div>
      </nav>

      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">Choose your path.</h1>
          <p className="text-zinc-400 text-lg md:text-xl font-light">Simple pricing for deep discovery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-[40px] border ${
                tier.highlight 
                  ? 'bg-white/[0.05] border-amber-400/30 shadow-[0_0_50px_rgba(251,191,36,0.05)]' 
                  : 'bg-white/[0.02] border-white/10'
              } flex flex-col`}
            >
              {tier.highlight && (
                <div className="absolute top-6 right-8 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[10px] font-black uppercase tracking-widest">
                  Recommended
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-black tracking-tight">{tier.price}</span>
                  <span className="text-zinc-500 text-sm">/month</span>
                </div>
                <p className="text-zinc-400 italic text-sm">{tier.description}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${tier.highlight ? 'bg-amber-400/20 text-amber-400' : 'bg-white/10 text-zinc-500'}`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm text-zinc-300 font-light">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${
                  tier.highlight
                    ? 'bg-amber-400 text-black hover:bg-amber-300'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-4">Trusted by explorers in</p>
          <p className="text-zinc-400 italic text-sm">NYC • Chicago • Miami • Austin • LA • London • Tokyo</p>
        </div>
      </section>

      <footer className="relative z-10 p-6 border-t border-white/[0.06] flex justify-center text-slate-500 text-xs">
        &copy; 2026 coroam.io. All rights reserved.
      </footer>
    </div>
  )
}
