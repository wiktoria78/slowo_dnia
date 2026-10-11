import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '../../hooks/useFavorites.js';
import ShareButton from './ShareButton';

const WordCard = ({ word, showFavoriteButton = true, scrollable = false }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [showExamples, setShowExamples] = useState(false);
  const [showEtymology, setShowEtymology] = useState(false);

  if (!word) return null;

  const favorite = isFavorite(word.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`card p-8 max-w-2xl mx-auto ${scrollable ? 'max-h-[80vh] overflow-y-auto custom-scrollbar' : ''}`}
    >
      {/* Word */}
      <div className="text-center mb-6">
        <h1 className="font-display text-5xl font-bold text-word mb-2">
          {word.word}
        </h1>
        <p className="font-body text-text-60 italic">{word.partOfSpeech}</p>
      </div>

      {/* Definition */}
      <div className="mb-6">
        <h2 className="font-ui text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
          Definicja
        </h2>
        <p className="font-body text-lg text-text leading-relaxed">
          {word.definition}
        </p>
      </div>

      {/* Synonyms */}
      <div className="mb-6">
        <h2 className="font-ui text-xs font-medium text-text-50 uppercase tracking-wider mb-2">
          Synonimy
        </h2>
        <div className="flex flex-wrap gap-2">
          {word.synonyms && word.synonyms.map((syn, idx) => (
            <span key={idx} className="tag">
              {syn}
            </span>
          ))}
        </div>
      </div>

      {/* Expandable sections */}
      <div className="space-y-3">
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="flex items-center gap-2 font-ui text-sm text-primary hover:opacity-80 transition-colors"
        >
          <span>{showExamples ? '▼' : '▶'}</span>
          Przykłady użycia
        </button>
        
         <AnimatePresence>
          {showExamples && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pl-6 border-l-2 border-secondary-30"
            >
               {word.examples && word.examples.map((example, idx) => (
                  <p key={idx} className="font-body text-text-80 italic mb-2">
                    &ldquo;{example}&rdquo;
                  </p>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setShowEtymology(!showEtymology)}
          className="flex items-center gap-2 font-ui text-sm text-primary hover:opacity-80 transition-colors"
        >
          <span>{showEtymology ? '▼' : '▶'}</span>
          Etymologia
        </button>

        <AnimatePresence>
          {showEtymology && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pl-6 border-l-2 border-secondary-30"
            >
              <p className="font-body text-text-80">
                {word.etymology}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category */}
        <div className="mt-4">
          <h2 className="font-ui text-xs font-medium text-text-50 uppercase tracking-wider mb-2">
            Kategoria
          </h2>
          <span className="badge">
            {word.category}
          </span>
        </div>
      </div>

      {/* Actions */}
      {showFavoriteButton && (
        <div className="mt-8 pt-6 border-t border-text-10 flex justify-center gap-4 max-w-sm mx-auto">
          <motion.button
            onClick={() => toggleFavorite(word)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 min-w-[140px] ${
              favorite
                ? 'bg-primary text-white'
                : 'bg-primary text-white hover:opacity-90'
            }`}
          >
            <span>{favorite ? '♥' : '♡'}</span>
            <span className="hidden sm:inline">
              {favorite ? 'Ulubione' : 'Ulubione'}
            </span>
          </motion.button>
          <ShareButton word={word} />
        </div>
      )}
    </motion.div>
  );
};

export default WordCard;