import { motion } from 'framer-motion'

interface LegalLayoutProps {
  title: string
  children: React.ReactNode
}

function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a1628] text-zinc-300 selection:bg-amber-400/90 selection:text-[#0a1628] font-sans pt-32 pb-20 px-6">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#050d18]" />
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-amber-400/[0.03] rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <a href="/" className="text-amber-400 text-sm font-bold uppercase tracking-widest hover:text-amber-300 transition-colors mb-8 inline-block">
            ← Back to Home
          </a>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none">
            {title}
          </h1>
          <p className="mt-4 text-zinc-500 font-medium italic">Last Updated: April 19, 2026</p>
        </motion.div>

        <div className="prose prose-invert prose-zinc max-w-none space-y-12 text-lg leading-relaxed font-light">
          {children}
        </div>
      </div>
    </div>
  )
}

export function Privacy() {
  return (
    <LegalLayout title="Privacy Policy">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">1. Data We Collect</h2>
        <p>
          To provide the specialized "Solo Roam" experience, CoRoam collects precise location data while you are actively using the app. We also collect basic account information (email) and your curated "Auto-Diary" entries, which may include photos and text insights generated during your roams.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">2. How We Use Your Location</h2>
        <p>
          Your location is processed in real-time to trigger Ambient Nudges and provide Vibe-Based Curation. We do not sell your movement data to third parties. Historical location data is stored only to build your private Auto-Diary and is encrypted at rest.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">3. AI Processing</h2>
        <p>
          CoRoam utilizes advanced AI models to generate insights and local lore. Your diary entries and location context are shared with our AI processing partners solely to generate your personalized content. This data is not used to train global AI models.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">4. Your Rights</h2>
        <p>
          You have the right to export your Auto-Diary data or request the full deletion of your account and all associated location history at any time through the app settings.
        </p>
      </section>
    </LegalLayout>
  )
}

export function Terms() {
  return (
    <LegalLayout title="Terms of Service">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">1. Acceptance of Terms</h2>
        <p>
          By accessing CoRoam, you agree to be bound by these terms. CoRoam is a tool for urban exploration and requires active GPS tracking to function as intended.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">2. User Safety</h2>
        <p>
          Urban exploration involves inherent risks. While CoRoam provides AI-curated routes, you are solely responsible for your own safety, situational awareness, and compliance with local laws. Do not enter restricted areas or ignore physical surroundings while using the app.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">3. Account Responsibility</h2>
        <p>
          You are responsible for maintaining the security of your account. Beta access is non-transferable and may be revoked if our community guidelines regarding respectful exploration are violated.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">4. Service Modifications</h2>
        <p>
          As an AI-native product in active development, CoRoam features and availability are subject to change. We reserve the right to modify or discontinue features to improve the explorer experience.
        </p>
      </section>
    </LegalLayout>
  )
}
