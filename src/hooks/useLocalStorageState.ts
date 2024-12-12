import { useState, useEffect, useCallback } from 'react';

export function useLocalStorageState<T>(key: string, initialValue: T) {
  // Initialize state with value from localStorage or initial value
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  // Wrap setState to handle errors and provide a cleaner API
  const setValue = useCallback((value: T | ((prevState: T) => T)) => {
    try {
      setState(prev => {
        const nextValue = value instanceof Function ? value(prev) : value;
        window.localStorage.setItem(key, JSON.stringify(nextValue));
        return nextValue;
      });
    } catch (error) {
      console.warn(`Error updating localStorage key "${key}":`, error);
    }
  }, [key]);

  return [state, setValue] as const;
}