import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatStackParamList } from '../../types/navigation';
import ChatListScreen from '../../screens/chat/ChatListScreen';
import ChatScreen from '../../screens/chat/ChatScreen';
import { colors, typography } from '../../styles/theme';

const Stack = createNativeStackNavigator<ChatStackParamList>();

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          ...typography.h1,
          color: colors.text,
        },
        headerTintColor: colors.text,
        headerBackVisible: true,
      }}
    >
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{ title: '채팅' }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.userName,
        })}
      />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator; 