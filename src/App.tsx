export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <header className="mb-12">
        <h1 className="text-6xl font-black tracking-tighter mb-4">COROAM</h1>
        <p className="text-xl text-zinc-400 max-w-md mx-auto">
          AI-native urban exploration. Designed for the Solo Walk.
        </p>
      </header>
      
      <main className="space-y-8">
        <div className="p-1 rounded-full bg-gradient-to-r from-zinc-800 to-zinc-700">
          <button className="px-8 py-3 rounded-full bg-black hover:bg-zinc-900 transition-all font-medium">
            Join the Waitlist
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 text-left max-w-4xl">
          <div className="space-y-2">
            <h3 className="font-bold text-zinc-200">Solo Walk HUD</h3>
            <p className="text-sm text-zinc-500">Lean, intuitive interface for deep urban immersion.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-zinc-200">Premium AI</h3>
            <p className="text-sm text-zinc-500">Relationship-aware companionship built on Gemini.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-zinc-200">Privacy First</h3>
            <p className="text-sm text-zinc-500">Your exploration data stays yours. Always.</p>
          </div>
        </div>
      </main>

      <footer className="mt-24 text-zinc-600 text-sm">
        &copy; 2026 CoRoam. Built for the modern explorer.
      </footer>
    </div>
  )
}
