import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_token';

interface Tokens {
  token: string;
}

const auth = {
  saveTokens: async (token: string): Promise<boolean> => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
      return true;
    } catch (error) {
      console.error('토큰 저장 실패:', error);
      return false;
    }
  },

  getTokens: async (): Promise<Tokens | null> => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (token) {
        return { token };
      }
      return null;
    } catch (error) {
      console.error('토큰 조회 실패:', error);
      return null;
    }
  },

  removeTokens: async (): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      return true;
    } catch (error) {
      console.error('토큰 삭제 실패:', error);
      return false;
    }
  },
};

export default auth; 