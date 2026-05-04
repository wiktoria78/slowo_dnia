import { Link, Routes, Route, NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Archive from './pages/Archive'
import Favorites from './pages/Favorites'
import { useUserStats } from './hooks/useUserStats'
import { useTheme } from './hooks/useTheme'
import StatsCard from './context/components/StatsCard'

function App() {
  const { stats, updateStats } = useUserStats()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    updateStats()
  }, [updateStats])

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface shadow-sm">
        <nav className="max-w-4xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <Link to="/" className="font-display text-2xl font-bold text-primary">
            Słowo Dnia
          </Link>
           <div className="flex gap-4 font-ui text-sm items-center">
              <NavLink to="/" className={({ isActive }) => isActive ? 'text-secondary font-semibold' : 'text-primary hover:text-secondary transition-colors'}>
                Dzisiaj
              </NavLink>
              <NavLink to="/archive" className={({ isActive }) => isActive ? 'text-secondary font-semibold' : 'text-primary hover:text-secondary transition-colors'}>
                Archiwum
              </NavLink>
              <NavLink to="/favorites" className={({ isActive }) => isActive ? 'text-secondary font-semibold' : 'text-primary hover:text-secondary transition-colors'}>
                Ulubione
              </NavLink>
              <StatsCard streak={stats.streak} />
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-surface/80 transition-colors"
                aria-label={theme === 'dark' ? 'Przełącz na tryb jasny' : 'Przełącz na tryb ciemny'}
              >
                {theme === 'dark' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 110 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
         </nav>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      
      <footer className="text-center py-6 text-text-60 text-sm font-ui">
        <p>© 2026 Słowo Dnia. Piękne polskie słowa każdego dnia.</p>
      </footer>
    </div>
  )
}

export default App