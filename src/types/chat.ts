export interface ChatMessage {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  isRead: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  lastMessage?: ChatMessage;
  unreadCount: number;
  participants: {
    id: string;
    name: string;
    avatar?: string;
  }[];
} 