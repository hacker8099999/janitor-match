export const FAVORITES_KEY = "janitor-match:favorites";
export const PREFERENCES_KEY = "janitor-match:preferences";

export function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function safeWrite<T>(key: string, value: T) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota/availability issues in restricted browsers.
  }
}

export function getFavoriteSlugs(): string[] {
  return safeRead<string[]>(FAVORITES_KEY, []);
}

export function toggleFavorite(slug: string) {
  const next = new Set(getFavoriteSlugs());
  if (next.has(slug)) {
    next.delete(slug);
  } else {
    next.add(slug);
  }
  const favorites = Array.from(next);
  safeWrite(FAVORITES_KEY, favorites);
  return favorites;
}

export function isFavorite(slug: string) {
  return getFavoriteSlugs().includes(slug);
}

export function getPreferenceTags(): string[] {
  return safeRead<string[]>(PREFERENCES_KEY, ["fantasy", "cozy", "supportive", "mystic"]);
}

export function setPreferenceTags(tags: string[]) {
  const deduped = Array.from(new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean)));
  safeWrite(PREFERENCES_KEY, deduped);
  return deduped;
}
