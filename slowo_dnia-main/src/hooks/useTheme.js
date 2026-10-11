import { useLocalStorage } from './useLocalStorage.js';

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage('theme', null);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return { theme: theme || 'light', toggleTheme };
};

export default useTheme;