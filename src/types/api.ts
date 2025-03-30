import { UserType } from './navigation';

export interface Pet {
  id: string;
  name: string;
  photo: string;
}

export interface UserInfo {
  id: string;
  email: string;
  userName: string;
  nickName?: string;
  phone?: string;
  birth?: string;
  gender?: string;
  comment?: string;
  userType: number;
  pets: Pet[];
}

export interface UserInfoResponse {
  code: number;
  message: string;
  data: UserInfo;
}