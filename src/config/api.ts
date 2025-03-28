interface ApiConfig {
  baseURL: string;
  endpoints: {
    login: string;
    signup: string;
  };
}

const development: ApiConfig = {
  baseURL: 'http://localhost:8080',
  endpoints: {
    login: '/api/users/login',
    signup: '/api/users/signup',
  },
};

const production: ApiConfig = {
  baseURL: 'https://api.pawong.com', // 실제 운영 서버 주소로 변경 필요
  endpoints: {
    login: '/api/users/login',
    signup: '/api/users/signup',
  },
};

const config = __DEV__ ? development : production;

export default config; 