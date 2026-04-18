import { useState } from 'react'
import { supabase } from './lib/supabase'
import { MapPin, Shield, Sparkles, Send } from 'lucide-react'
import { motion } from 'framer-motion'

export default function App() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, source: 'web_main' }])

      if (error) throw error
      setMessage("You're on the list. Keep an eye on your inbox.")
      setEmail('')
    } catch (err: any) {
      setMessage(err.message || "Something went wrong. Try again?")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-coroam-accent selection:text-black">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4">COROAM</h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-lg mx-auto font-light">
            AI-native urban exploration. Designed for the <span className="text-white font-medium">Solo Walk</span>.
          </p>
        </motion.header>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md"
        >
          <form onSubmit={handleWaitlist} className="relative group">
            <input 
              type="email" 
              required
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-zinc-900 border border-zinc-800 focus:border-zinc-600 focus:outline-none transition-all pr-36"
            />
            <button 
              disabled={loading}
              className="absolute right-1.5 top-1.5 px-6 py-2.5 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? '...' : 'Join'} <Send size={16} />
            </button>
          </form>
          {message && <p className="mt-4 text-sm text-zinc-500">{message}</p>}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-24 text-left max-w-5xl"
        >
          <div className="space-y-3">
            <MapPin className="text-zinc-400" size={24} />
            <h3 className="font-bold text-lg">Solo Walk HUD</h3>
            <p className="text-zinc-500 leading-relaxed">A specialized interface for deep urban immersion. No distractions, just exploration.</p>
          </div>
          <div className="space-y-3">
            <Sparkles className="text-zinc-400" size={24} />
            <h3 className="font-bold text-lg">Relationship AI</h3>
            <p className="text-zinc-500 leading-relaxed">Built on Gemini for a companion that understands your preferences and context.</p>
          </div>
          <div className="space-y-3">
            <Shield className="text-zinc-400" size={24} />
            <h3 className="font-bold text-lg">Privacy First</h3>
            <p className="text-zinc-500 leading-relaxed">Encryption by default. Your movement data is never sold or shared.</p>
          </div>
        </motion.div>
      </section>

      <footer className="p-12 border-t border-zinc-900 text-center text-zinc-600 text-sm">
        &copy; 2026 CoRoam. All rights reserved.
      </footer>
    </div>
  )
}
