import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce values (prevents excessive re-renders during search)
 */
export const useDebounce = (value, delay = 250) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
