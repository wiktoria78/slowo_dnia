import { useLocalStorage } from './useLocalStorage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage('slowo-dnia-favorites', []);

  const addFavorite = (word) => {
    if (!favorites.find(f => f.id === word.id)) {
      setFavorites(prev => [...prev, word]);
    }
  };

  const removeFavorite = (wordId) => {
    setFavorites(prev => prev.filter(f => f.id !== wordId));
  };

  const isFavorite = (wordId) => {
    return favorites.some(f => f.id === wordId);
  };

  const toggleFavorite = (word) => {
    if (isFavorite(word.id)) {
      removeFavorite(word.id);
    } else {
      addFavorite(word);
    }
  };

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
};

export default useFavorites;