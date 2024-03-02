const storage = typeof window !== "undefined" ? window.localStorage : undefined;

const appStorage = {
  getItem(key: string) {
    if (!storage) return null;

    return storage.getItem(key);
  },
  setItem(key: string, value: string) {
    if (!storage) return;

    storage.setItem(key, value);
  },
  removeItem(key: string) {
    if (!storage) return;

    storage.removeItem(key);
  },
  clear() {
    if (!storage) return;

    storage.clear();
  },
};

export { appStorage };
