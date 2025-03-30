import { UserType } from './navigation';

export interface Pet {
  id: number;
  name: string;
  age: number;
  species: string;
  description: string;
  photo: string;
}

export interface UserInfo {
  email: string;
  password: string;
  userName: string;
  nickName: string | null;
  birth: string | null;
  gender: 'M' | 'F' | null;
  phone: string;
  userType: number;
  comment: string | null;
  pets: Pet[];
}

// 실제 API 응답은 UserInfo 타입 그대로임
export type UserInfoResponse = UserInfo; 