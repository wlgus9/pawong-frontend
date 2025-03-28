import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../styles/theme';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ChatStackParamList } from '../../types/navigation';

type ChatScreenRouteProp = RouteProp<ChatStackParamList, 'Chat'>;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

const ChatScreen = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const { userId, userName } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // 실제 구현에서는 API를 통해 해당 사용자와의 채팅 내역을 가져옵니다
    const userMessages = getDummyMessages(userId);
    setMessages(userMessages);
  }, [userId]);

  const getDummyMessages = (userId: string): Message[] => {
    // 사용자별 더미 메시지 데이터
    const dummyMessages: { [key: string]: Message[] } = {
      'user1': [
        { id: '1', text: '안녕하세요, 돌봄 서비스 문의드립니다.', sender: 'user', timestamp: new Date('2024-03-10T10:00:00') },
        { id: '2', text: '네, 어떤 도움이 필요하신가요?', sender: 'other', timestamp: new Date('2024-03-10T10:01:00') },
      ],
      'user2': [
        { id: '3', text: '예약한 돌봄 일정 변경 가능할까요?', sender: 'user', timestamp: new Date('2024-03-11T15:00:00') },
        { id: '4', text: '네, 가능합니다. 원하시는 날짜를 알려주세요.', sender: 'other', timestamp: new Date('2024-03-11T15:02:00') },
      ],
      'user3': [
        { id: '5', text: '후기 작성은 어떻게 하나요?', sender: 'user', timestamp: new Date('2024-03-12T09:00:00') },
        { id: '6', text: '마이페이지에서 작성하실 수 있습니다.', sender: 'other', timestamp: new Date('2024-03-12T09:01:00') },
      ],
    };
    return dummyMessages[userId] || [];
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.otherMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.sender === 'user' ? styles.userMessageText : styles.otherMessageText
      ]}>
        {item.text}
      </Text>
      <Text style={styles.timestamp}>
        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{userName}</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="메시지를 입력하세요"
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.disabledButton]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendButtonText}>전송</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerText: {
    ...typography.h2,
    textAlign: 'center',
  },
  messageList: {
    padding: spacing.sm,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: spacing.xs,
    padding: spacing.sm,
    borderRadius: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
  },
  messageText: {
    ...typography.body,
  },
  userMessageText: {
    color: colors.white,
  },
  otherMessageText: {
    color: colors.text,
  },
  timestamp: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
    fontSize: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: spacing.sm,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    ...typography.body,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: colors.border,
  },
  sendButtonText: {
    ...typography.button,
    color: colors.white,
  },
});

export default ChatScreen; 