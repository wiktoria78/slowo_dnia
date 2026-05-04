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
                className="p-1.5 rounded-lg transition-colors"
                aria-label={theme === 'dark' ? 'Przełącz na tryb jasny' : 'Przełącz na tryb ciemny'}
              >
                {theme === 'dark' ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v2M12 20v2M5 12H3M21 12h-2M6.34 6.34l-1.42 1.42M17.08 17.08l1.42 1.42M6.34 17.66l1.42-1.42M17.08 6.92l1.42-1.42" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
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