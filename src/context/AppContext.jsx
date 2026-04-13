import { createContext } from 'react';
import { useFavorites } from '../hooks/useFavorites';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const favorites = useFavorites();

  const value = {
    ...favorites,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;