import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorMonitorBoundary } from './components/ErrorMonitorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorMonitorBoundary>
      <App />
    </ErrorMonitorBoundary>
  </StrictMode>,
)
