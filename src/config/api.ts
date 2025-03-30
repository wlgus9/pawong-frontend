export const ApiConfig = {
  baseUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080',
  endpoints: {
    auth: {
      login: '/api/users/login',
      signup: '/api/users/signup',
      logout: '/api/my-page/logout',
      checkEmail: '/api/users/check-email',
      reissue: '/api/users/reissue',
    },
    mypage: {
      userInfo: '/api/my-page/search/user-info',
      updateUserInfo: '/api/my-page/update/user-info',
      deleteAccount: '/api/my-page/delete',
    },
    pet: {
      list: '/api/pets',
      create: '/api/pets',
      update: '/api/pets/:id',
      delete: '/api/pets/:id',
    },
  },
};

export default ApiConfig; 