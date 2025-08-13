import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for persisting state to localStorage
 * @param {any} defaultValue - The initial value for the state defaults to null
 * @param {string} key - Unique key for localStorage (required)
 * @param {{serialize?: (value: any) => string, deserialize?: (value: string) => any, onError?: (error: any) => void, endpoint?: string, debounceMs?: number}} options - Optional configuration
 * @returns {[any, Function]} - [state, setState] tuple similar to useState
 */
const usePersistState = (defaultValue = null, key, options = {}) => {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    onError = (error) => console.warn("localStorage error:", error),
    endpoint = null,
    debounceMs = 500, // delay backend saves to avoid spamming,
  } = options;

  const timerRef = useRef(null);

  // Check if key is provided
  if (!key) {
    throw new Error("usePersistState requires a key");
  }

  // Initialization of state with local first.
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? deserialize(item) : defaultValue;
    } catch (error) {
      onError(error);
      return defaultValue;
    }
  });

  // Fetch the data from endpoint and merge to state.
  const firstLoad = useRef(false);
  async function loadStateWithEndpoint(key) {
    if (!endpoint) return;
    try {
      const res = await fetch(`${endpoint}?key=${encodeURIComponent(key)}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.value !== undefined) {
          setState((prev) => [
            ...prev,
            ...data.value.filter(
              (obj) => !prev.some((b) => b.idMeal === obj.idMeal)
            ),
          ]);
        }
      }
    } catch (error) {
      onError(error);
    }
  }
  if (!firstLoad.current) {
    firstLoad.current = true;
    loadStateWithEndpoint(key);
  }

  // --- Save to localStorage always whenever state changes ---
  useEffect(() => {
    try {
      console.log("sync localstorage with state");

      // Always save to localStorage immediately
      localStorage.setItem(key, serialize(state));

      // Debounce backend save
      if (endpoint) {
        timerRef.current = setTimeout(() => {
          fetch(endpoint, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key, value: state }),
          }).catch(onError);
        }, debounceMs);

        // Cleanup: clear previous timer if state changes before debounceMs
        return () => {
          clearTimeout(timerRef.current);
        };
      }
    } catch (error) {
      onError(error);
    }
  }, [state, key, serialize, endpoint, debounceMs, onError]);

  return [state, setState];
};

export default usePersistState;
