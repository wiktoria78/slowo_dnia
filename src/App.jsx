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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" strokeWidth={2} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zm-2.93-5.17c.39.39.9.63 1.43.63.55 0 1.06-.22 1.43-.63.39-.39.63-.9.63-1.43 0-.55-.22-1.06-.63-1.43-.37-.39-.88-.63-1.43-.63-.53 0-1.04.24-1.43.63-.39.37-.63.88-.63 1.43 0 .53.24 1.04.63 1.43zm1.43 12.67c.55 0 1.06-.22 1.43-.63.39-.39.63-.9.63-1.43 0-.55-.22-1.06-.63-1.43-.37-.39-.88-.63-1.43-.63-.53 0-1.04.24-1.43.63-.39.37-.63.88-.63 1.43 0 .53.24 1.04.63 1.43.39.41.9.63 1.43.63z" />
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