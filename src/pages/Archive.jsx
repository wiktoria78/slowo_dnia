import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
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

  const archiveWords = useMemo(() => {
    const daysElapsed = getDaysElapsed(START_DATE);
    const maxIndex = Math.min(daysElapsed, wordsData.length);
    return wordsData.slice(0, maxIndex);
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
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 rounded-lg border border-text/20 bg-surface font-ui text-text focus:outline-none focus:border-primary"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Wszystkie kategorie' : cat}
              </option>
            ))}
          </select>
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