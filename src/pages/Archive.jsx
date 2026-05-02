import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import wordsData from '../data/words.json';
import WordCard from '../context/components/WordCard.jsx';
import ShareButton from '../context/components/ShareButton.jsx';
import { useFavorites } from '../hooks/useFavorites.js';

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

  const [selectedWord, setSelectedWord] = useState(null);

  return (
    <div>
      {/* Word Detail Modal */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedWord(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: 'spring' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl"
            >
              <WordCard word={selectedWord} showFavoriteButton={true} />
              <button
                onClick={() => setSelectedWord(null)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-surface border border-text/20 text-text/60 hover:text-text hover:border-text/40 flex items-center justify-center transition-colors"
                aria-label="Zamknij"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="w-full px-4 py-3 rounded-lg border border-text/20 bg-surface font-ui text-text text-left flex justify-between items-center gap-2 hover:border-primary/50 transition-colors"
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
                        className={`w-full px-3 py-2 text-left font-ui text-sm transition-colors whitespace-nowrap ${
                          selectedCategory === cat
                            ? 'bg-secondary/10 text-secondary'
                            : 'text-text hover:bg-secondary/5 hover:text-secondary'
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedWord(word)}
            className="bg-surface rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col min-h-[180px] cursor-pointer border border-transparent hover:border-primary/20"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedWord(word);
              }
            }}
          >
            <h3 className="font-display text-xl font-bold text-primary mb-2">
              {word.word}
            </h3>
            <p className="font-body text-sm text-text/80 leading-relaxed mb-3 flex-grow line-clamp-3">
              {word.definition}
            </p>
            <div className="mt-auto">
              <span className="inline-block px-3 py-1 bg-secondary/20 rounded-full font-ui text-xs font-medium text-secondary">
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