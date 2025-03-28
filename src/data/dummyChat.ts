import { ChatMessage, ChatRoom } from '../types/chat';

export const CURRENT_USER = {
  id: 'user1',
  name: '나',
  avatar: 'https://i.pravatar.cc/150?img=1',
};

export const OTHER_USER = {
  id: 'user2',
  name: '홍길동',
  avatar: 'https://i.pravatar.cc/150?img=2',
};

export const OTHER_USERS = [
  OTHER_USER,
  {
    id: 'user3',
    name: '김철수',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 'user4',
    name: '이영희',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
];

export const dummyChatMessages: ChatMessage[] = [
  {
    id: '1',
    text: '안녕하세요!',
    sender: OTHER_USER,
    timestamp: new Date('2024-03-20T10:00:00'),
    isRead: true,
  },
  {
    id: '2',
    text: '네, 안녕하세요!',
    sender: CURRENT_USER,
    timestamp: new Date('2024-03-20T10:01:00'),
    isRead: true,
  },
  {
    id: '3',
    text: '오늘 날씨가 정말 좋네요.',
    sender: OTHER_USER,
    timestamp: new Date('2024-03-20T10:02:00'),
    isRead: true,
  },
  {
    id: '4',
    text: '네, 그러네요. 산책하기 좋은 날씨예요!',
    sender: CURRENT_USER,
    timestamp: new Date('2024-03-20T10:03:00'),
    isRead: true,
  },
  {
    id: '5',
    text: '점심 식사는 하셨나요?',
    sender: OTHER_USER,
    timestamp: new Date('2024-03-20T12:00:00'),
    isRead: false,
  },
];

export const dummyChatRoom: ChatRoom = {
  id: 'room1',
  name: '홍길동',
  lastMessage: dummyChatMessages[dummyChatMessages.length - 1],
  unreadCount: 1,
  participants: [CURRENT_USER, OTHER_USER],
};

export const dummyChatRooms: ChatRoom[] = [
  dummyChatRoom,
  {
    id: 'room2',
    name: '김철수',
    lastMessage: {
      id: '10',
      text: '오늘 저녁에 시간 되시나요?',
      sender: OTHER_USERS[1],
      timestamp: new Date('2024-03-20T15:30:00'),
      isRead: false,
    },
    unreadCount: 2,
    participants: [CURRENT_USER, OTHER_USERS[1]],
  },
  {
    id: 'room3',
    name: '이영희',
    lastMessage: {
      id: '15',
      text: '네, 알겠습니다!',
      sender: CURRENT_USER,
      timestamp: new Date('2024-03-20T14:20:00'),
      isRead: true,
    },
    unreadCount: 0,
    participants: [CURRENT_USER, OTHER_USERS[2]],
  },
]; 