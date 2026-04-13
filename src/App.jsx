import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Archive from './pages/Archive'
import Favorites from './pages/Favorites'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface shadow-sm">
        <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="font-display text-2xl font-bold text-primary">
            Słowo Dnia
          </Link>
          <div className="flex gap-4 font-ui text-sm">
            <Link to="/" className="text-text hover:text-primary transition-colors">
              Dzisiaj
            </Link>
            <Link to="/archive" className="text-text hover:text-primary transition-colors">
              Archiwum
            </Link>
            <Link to="/favorites" className="text-text hover:text-primary transition-colors">
              Ulubione
            </Link>
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
      
      <footer className="text-center py-6 text-text/60 text-sm font-ui">
        <p>© 2026 Słowo Dnia. Piękne polskie słowa każdego dnia.</p>
      </footer>
    </div>
  )
}

export default App