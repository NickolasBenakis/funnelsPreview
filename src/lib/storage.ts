class BrowserStorage {
  private storage: globalThis.Storage;

  constructor(storage = globalThis.localStorage) {
    this.storage = storage;
  }

  getItem<T>(key: string): Promise<T | undefined> {
    return new Promise((resolve) => {
      try {
        const value = this.storage.getItem(key);
        if (value == null) {
          return resolve(undefined);
        }

        return resolve(JSON.parse(value));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Storage Error", error);
        return resolve(undefined);
      }
    });
  }

  getItemSync<T>(key: string): T | undefined {
    try {
      const value = this.storage.getItem(key);
      if (value == null) {
        return undefined;
      }

      return JSON.parse(value);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("Storage Error", error);
      return undefined;
    }
  }

  setItem(key: string, value: unknown): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        this.storage.setItem(key, JSON.stringify(value));
        resolve(true);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Storage Error", error);
        resolve(false);
      }
    });
  }

  setItemSync(key: string, value: unknown): boolean {
    try {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("Storage Error", error);
      return false;
    }
  }

  removeItem(key: string): Promise<void> {
    return new Promise((resolve) => resolve(this.storage.removeItem(key)));
  }

  removeItemSync(key: string) {
    this.storage.removeItem(key);
  }

  key(index: number) {
    return this.storage.key(index);
  }

  clear() {
    this.storage.clear();
  }
}

export const sessionStorage = new BrowserStorage(globalThis.sessionStorage);
export const localStorage = new BrowserStorage(globalThis.localStorage);
