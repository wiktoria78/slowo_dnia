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
        <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
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
                {theme === 'dark' ? '☀️' : '🌙'}
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