import AsyncStorage from '@react-native-async-storage/async-storage';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5분

export const cache = {
  async set<T>(key: string, data: T): Promise<void> {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(cacheItem));
  },

  async get<T>(key: string): Promise<T | null> {
    const cached = await AsyncStorage.getItem(key);
    if (!cached) return null;

    const cacheItem: CacheItem<T> = JSON.parse(cached);
    const isExpired = Date.now() - cacheItem.timestamp > CACHE_DURATION;

    if (isExpired) {
      await AsyncStorage.removeItem(key);
      return null;
    }

    return cacheItem.data;
  },

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },
};

export const CACHE_KEYS = {
  USER_INFO: 'user_info',
} as const; 