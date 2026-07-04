"use client";

import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";

function parseStoredValue<T>(raw: string | null, initialValue: T): T {
  if (raw === null) return initialValue;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const subscribe = useCallback(
    (callback: () => void) => {
      const handleStorage = (event: StorageEvent) => {
        if (event.key === key) callback();
      };
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    },
    [key]
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  }, [key]);

  const getServerSnapshot = useCallback(() => {
    return null;
  }, []);

  const rawSnapshot = useSyncExternalStore<string | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const storedValue = useMemo(
    () => parseStoredValue(rawSnapshot, initialValue),
    [rawSnapshot, initialValue]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(key) === null) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
    }
  }, [key, initialValue]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        if (typeof window === "undefined") return;

        const currentRaw = window.localStorage.getItem(key);
        const currentValue = parseStoredValue(currentRaw, initialValue);
        const valueToStore =
          value instanceof Function ? value(currentValue) : value;

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new StorageEvent("storage", { key }));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, initialValue]
  );

  return [storedValue, setValue, true];
}
