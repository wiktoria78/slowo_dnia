import { motion } from 'framer-motion';
import { useWordOfDay } from '../hooks/useWordOfDay.js';
import WordCard from '../context/components/WordCard.jsx';
import wordsData from '../data/words.json';

const Home = () => {
  const { wordOfDay, loading, isFinished, getCurrentIndex } = useWordOfDay();

  const today = new Date().toLocaleDateString('pl-PL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentIndex = getCurrentIndex ? getCurrentIndex() : 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="font-ui text-sm text-text-60 uppercase tracking-wider mb-2">
          {today}
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-text">
          {isFinished ? 'Archiwum' : 'Słowo na dziś'}
        </h1>
      </div>

      {/* Word Card */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          />
        </div>
      ) : isFinished ? (
        <div className="max-w-xl mx-auto mt-12 text-center">
          <p className="font-body text-text-80 text-lg">
            Wszystkie słowa zostały wyświetlone.
          </p>
          <p className="font-body text-text-60 text-sm mt-2">
            Przeszłeś przez {currentIndex} / {wordsData?.length || 100} słów.
          </p>
        </div>
      ) : (
        <WordCard word={wordOfDay} />
      )}

      {/* Info section */}
      <div className="max-w-xl mx-auto mt-12 text-center">
        <p className="font-body text-text-60 text-sm">
          Odkrywaj piękne, rzadko używane polskie słowa każdego dnia.
          Dodawaj ulubione do swojej kolekcji i ucz się nowych wyrazów.
        </p>
      </div>
    </div>
  );
};

export default Home;