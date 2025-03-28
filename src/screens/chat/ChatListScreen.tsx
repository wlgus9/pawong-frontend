import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChatStackParamList } from '../../types/navigation';

type ChatNavigationProp = NativeStackNavigationProp<ChatStackParamList, 'ChatList'>;

interface ChatRoom {
  id: string;
  userId: string;
  userName: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  userImage: string;
}

const dummyChatRooms: ChatRoom[] = [
  {
    id: 'chat1',
    userId: 'user1',
    userName: '김철수',
    lastMessage: '안녕하세요, 돌봄 서비스 문의드립니다.',
    timestamp: new Date('2024-03-10T10:00:00'),
    unreadCount: 2,
    userImage: 'https://picsum.photos/200',
  },
  {
    id: 'chat2',
    userId: 'user2',
    userName: '이영희',
    lastMessage: '예약한 돌봄 일정 변경 가능할까요?',
    timestamp: new Date('2024-03-11T15:00:00'),
    unreadCount: 0,
    userImage: 'https://picsum.photos/201',
  },
  {
    id: 'chat3',
    userId: 'user3',
    userName: '박지민',
    lastMessage: '후기 작성은 어떻게 하나요?',
    timestamp: new Date('2024-03-12T09:00:00'),
    unreadCount: 1,
    userImage: 'https://picsum.photos/202',
  },
];

const ChatListScreen = () => {
  const navigation = useNavigation<ChatNavigationProp>();

  const handleChatPress = (chatRoom: ChatRoom) => {
    navigation.navigate('Chat', {
      userId: chatRoom.userId,
      userName: chatRoom.userName,
    });
  };

  const renderChatRoom = ({ item }: { item: ChatRoom }) => (
    <TouchableOpacity
      style={styles.chatRoom}
      onPress={() => handleChatPress(item)}
    >
      <Image source={{ uri: item.userImage }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.timestamp}>
            {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
        <View style={styles.lastMessageContainer}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dummyChatRooms}
        renderItem={renderChatRoom}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: spacing.sm,
  },
  chatRoom: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.md,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    ...typography.h3,
    color: colors.text,
  },
  timestamp: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  lastMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
    marginRight: spacing.sm,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  unreadCount: {
    ...typography.caption,
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default ChatListScreen; 