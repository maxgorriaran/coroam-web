import { StrictMode, Component, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

class RootErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            padding: 24,
            minHeight: '100vh',
            background: '#0a1628',
            color: '#fca5a5',
            fontFamily: 'ui-monospace, monospace',
            whiteSpace: 'pre-wrap',
          }}
        >
          {this.state.error.message}
        </div>
      )
    }
    return this.props.children
  }
}

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('Missing #root element')
}

createRoot(rootEl).render(
  <RootErrorBoundary>
    <StrictMode>
      <App />
    </StrictMode>
  </RootErrorBoundary>,
)
