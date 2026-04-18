import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Many embedded browsers default to `http://localhost/` (port 80) — Vite uses 5173, which looks “blank” if the port is wrong. */
function devUrlHint(): Plugin {
  return {
    name: 'dev-url-hint',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const port =
          typeof server.config.server.port === 'number'
            ? server.config.server.port
            : 5173
        server.config.logger.info(
          `\n  ${'\u001b[33m'}${'\u001b[1m'}Dev URL:${'\u001b[0m'} ${'\u001b[1m'}http://localhost:${port}/${'\u001b[0m'} ${'\u001b[90m'}(use the “Local” URL printed below)${'\u001b[0m'}\n`
        )
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [tailwindcss(), react(), ...(command === 'serve' ? [devUrlHint()] : [])],
  /** Pre-bundle heavy deps so the first `/src/main.tsx` request returns quickly. */
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react',
      '@supabase/supabase-js',
    ],
  },
  server: {
    port: 5173,
    /**
     * Listen on all interfaces (not only 127.0.0.1). Binding IPv4-only breaks some setups where the
     * browser uses `http://localhost:5173/` (IPv6 / different resolution) and the dev client or HMR
     * WebSocket never connects — looks like “loading forever”.
     */
    host: true,
    open: '/',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom')
          ) {
            return 'react-vendor'
          }
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('@supabase')) return 'supabase'
          if (id.includes('lucide-react')) return 'icons'
        },
      },
    },
  },
}))
