import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import AppProvider from './context/AppContext.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'

// Initialize theme before render to avoid flash
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light')
  document.documentElement.setAttribute('data-theme', theme)
  if (!savedTheme) {
    localStorage.setItem('theme', theme)
  }
}

initializeTheme()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <AppProvider>
          <App />
        </AppProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
)