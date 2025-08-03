import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook for persisting state to localStorage
 * @param {any} defaultValue - The initial value for the state
 * @param {string} key - Unique key for localStorage (required)
 * @param {{serialize?: (value: any) => string, deserialize?: (value: string) => any, onError?: (error: any) => void}} options - Optional configuration
 * @returns {[any, Function]} - [state, setState] tuple similar to useState
 */
const usePersistState = (defaultValue, key, options = {}) => {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    onError = (error) => console.warn("localStorage error:", error),
  } = options;

  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? deserialize(item) : defaultValue;
    } catch (error) {
      onError(error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, serialize(state));
    } catch (error) {
      onError(error);
    }
  }, [state, key, serialize]);

  const setPersistState = useCallback((newValue) => {
    setState((prevState) => {
      return typeof newValue === "function" ? newValue(prevState) : newValue;
    });
  }, []);

  const clearPersistState = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setState(defaultValue);
    } catch (error) {
      onError(error);
    }
  }, [key, defaultValue]);

  return [state, setPersistState, clearPersistState];
};

export default usePersistState;
