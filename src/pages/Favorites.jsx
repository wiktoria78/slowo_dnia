import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites.js';
import WordCard from '../context/components/WordCard.jsx';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-text text-center mb-8">
        Ulubione
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="font-body text-text-60 mb-4">
            Nie masz jeszcze ulubionych słów.
          </p>
          <a 
            href="/" 
            className="font-ui text-primary hover:underline"
          >
            Zobacz słowo dnia →
          </a>
        </div>
      ) : (
        <>
          <p className="text-center text-text-60 font-ui text-sm mb-8">
            {favorites.length} {favorites.length === 1 ? 'słowo' : favorites.length < 5 ? 'słowa' : 'słów'} w ulubionych
          </p>
          
          <div className="space-y-6">
            <AnimatePresence>
              {favorites.map((word, index) => (
                <motion.div
                  key={word.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <WordCard word={word} showFavoriteButton={false} />
                  <button
                    onClick={() => removeFavorite(word.id)}
                    className="absolute top-4 right-4 font-ui text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    ✕
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;