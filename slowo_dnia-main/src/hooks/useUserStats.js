import { useLocalStorage } from './useLocalStorage';

const getTodayDate = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

const isNextDay = (lastVisit, today) => {
  const last = new Date(lastVisit);
  const next = new Date(last);
  next.setDate(next.getDate() + 1);
  return (
    next.getFullYear() === parseInt(today.slice(0, 4)) &&
    next.getMonth() + 1 === parseInt(today.slice(5, 7)) &&
    next.getDate() === parseInt(today.slice(8, 10))
  );
};

export const useUserStats = () => {
  const [stats, setStats] = useLocalStorage('slowo-dnia-user-stats', {
    lastVisit: null,
    streak: 0,
  });

  const updateStats = () => {
    const today = getTodayDate();

    setStats(prev => {
      if (!prev.lastVisit) {
        return { lastVisit: today, streak: 1 };
      }

      if (prev.lastVisit === today) {
        return prev;
      }

      if (isNextDay(prev.lastVisit, today)) {
        return { lastVisit: today, streak: prev.streak + 1 };
      }

      return { lastVisit: today, streak: 1 };
    });
  };

  return { stats, updateStats };
};

export default useUserStats;
