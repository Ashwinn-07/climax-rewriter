const ONE_DAY = 24 * 60 * 60 * 1000;

interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

export function getCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const parsed: CacheEntry<T> = JSON.parse(raw);

    if (Date.now() - parsed.timestamp > ONE_DAY) {
      localStorage.removeItem(key);
      return null;
    }

    return parsed.data;
  } catch {
    return null;
  }
}

export function setCache<T>(key: string, data: T) {
  const entry: CacheEntry<T> = {
    timestamp: Date.now(),
    data,
  };

  localStorage.setItem(key, JSON.stringify(entry));
}
