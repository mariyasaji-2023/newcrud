const store = new Map();

export const setCache = (key, value, ttlMs = 5 * 60 * 1000) => {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
};

export const getCache = (key) => {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.value;
};

export const invalidateCache = (...keys) => {
  keys.forEach((k) => store.delete(k));
};
