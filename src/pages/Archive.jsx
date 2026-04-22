import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import wordsData from '../data/words.json';

const START_DATE = new Date('2026-04-13');

const getDaysElapsed = (startDate) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const diff = now - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const Archive = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const archiveWords = useMemo(() => {
    const daysElapsed = getDaysElapsed(START_DATE);
    const maxIndex = Math.min(daysElapsed, wordsData.length);
    return wordsData.slice(0, maxIndex).reverse();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(archiveWords.map(w => w.category));
    return ['all', ...Array.from(cats)];
  }, [archiveWords]);

  const filteredWords = useMemo(() => {
    return archiveWords.filter(word => {
      const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || word.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [archiveWords, searchTerm, selectedCategory]);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-text text-center mb-8">
        Archiwum słów
      </h1>

      {/* Filters */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Szukaj słowa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-text/20 bg-surface font-ui text-text placeholder:text-text/40 focus:outline-none focus:border-primary"
          />
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-4 py-3 rounded-lg border border-text/20 bg-surface font-ui text-text text-left flex justify-between items-center hover:border-primary/50 transition-colors"
            >
              <span>{selectedCategory === 'all' ? 'Wszystkie kategorie' : selectedCategory}</span>
              <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-10 w-full mt-2 bg-surface border border-text/20 rounded-lg shadow-lg overflow-hidden"
                >
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left font-ui text-text hover:bg-background transition-colors ${
                        selectedCategory === cat ? 'bg-background text-primary' : ''
                      }`}
                    >
                      {cat === 'all' ? 'Wszystkie kategorie' : cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-center text-text/60 font-ui text-sm mb-6">
        Znaleziono {filteredWords.length} słów
      </p>

      {/* Words grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWords.map((word, index) => (
          <motion.div
            key={word.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-surface rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-display text-xl font-bold text-primary mb-2">
              {word.word}
            </h3>
            <p className="font-body text-sm text-text/80 line-clamp-2 mb-3">
              {word.definition}
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="px-2 py-0.5 bg-background rounded text-xs font-ui text-text/60">
                {word.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredWords.length === 0 && (
        <p className="text-center text-text/60 font-ui py-12">
          Brak słów spełniających kryteria wyszukiwania.
        </p>
      )}
    </div>
  );
};

export default Archive;