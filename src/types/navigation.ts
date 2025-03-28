export enum UserType {
  CAREGIVER = 1,
  OWNER = 2,
}

export type RootStackParamList = {
  Auth: undefined;
  TabNavigator: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: { userType: UserType };
  UserType: undefined;
};

export type ChatStackParamList = {
  ChatList: undefined;
  Chat: {
    userId: string;
    userName: string;
  };
};

export type CareStackParamList = {
  CareHistory: undefined;
  CareDetail: {
    careId: string;
  };
};

export type TabParamList = {
  홈: undefined;
  채팅: undefined;
  CareHistory: undefined;
  마이페이지: undefined;
}; 