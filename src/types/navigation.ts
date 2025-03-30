import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum UserType {
  CAREGIVER = 1,
  KEEPER = 2,
}

export type RootStackParamList = {
  Auth: undefined;
  Login: undefined;
  Register: undefined;
  UserType: undefined;
  Main: undefined;
  TabNavigator: undefined;
  PetManage: undefined;
  UserInfoEdit: undefined;
  Authenticated: undefined;
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

export type MyPageStackParamList = {
  MyPage: undefined;
  UserInfoEdit: undefined;
};

export type TabParamList = {
  홈: undefined;
  채팅: undefined;
  CareStack: undefined;
  마이페이지: undefined;
};

// 네비게이션 타입 통합
export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList & 
  AuthStackParamList & 
  ChatStackParamList & 
  CareStackParamList & 
  MyPageStackParamList
>; 