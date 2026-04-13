import { useState, useEffect } from 'react';
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

const getWordOfDay = (words) => {
  const daysElapsed = getDaysElapsed(START_DATE);
  if (daysElapsed < 0) {
    return words[0];
  }
  if (daysElapsed >= words.length) {
    return null;
  }
  return words[daysElapsed];
};

export const useWordOfDay = () => {
  const [wordOfDay, setWordOfDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const daysElapsed = getDaysElapsed(START_DATE);
      if (daysElapsed >= wordsData.length) {
        setIsFinished(true);
        setWordOfDay(null);
      } else {
        const word = getWordOfDay(wordsData);
        setWordOfDay(word);
      }
      setLoading(false);
    }, 300);
  }, []);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordsData.length);
    return wordsData[randomIndex];
  };

  const getCurrentIndex = () => {
    return getDaysElapsed(START_DATE);
  };

  return { wordOfDay, loading, getRandomWord, isFinished, getCurrentIndex, START_DATE };
};

export default useWordOfDay;