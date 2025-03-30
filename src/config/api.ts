const BASE_URL = 'http://localhost:8080';

export const ApiEndpoints = {
  auth: {
    login: '/api/users/login',
    signup: '/api/users/signup',
    reissue: '/api/users/reissue',
  },
  mypage: {
    userInfo: '/api/my-page/search/user-info',
    updateNickname: '/api/my-page/update/nickname',
    deleteAccount: '/api/my-page/delete',
  },
  pet: {
    list: '/api/pets',
    create: '/api/pets',
    update: '/api/pets/:id',
    delete: '/api/pets/:id',
  },
} as const;

export const ApiConfig = {
  baseURL: BASE_URL,
  endpoints: ApiEndpoints,
} as const;

export default ApiConfig; 