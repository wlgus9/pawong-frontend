import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CareMapScreen from '../screens/map/CareMapScreen';
import ChatStackNavigator from './chat/ChatStackNavigator';
import CareStackNavigator from './care/CareStackNavigator';
import MyPageStackNavigator from './mypage/MyPageStackNavigator';
import { TabParamList } from '../types/navigation';
import { colors } from '../styles/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserInfoProvider } from '../contexts/UserInfoContext';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <UserInfoProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      >
        <Tab.Screen
          name="홈"
          component={CareMapScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="채팅"
          component={ChatStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="chatbubble-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="CareStack"
          component={CareStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar-outline" size={size} color={color} />
            ),
            tabBarLabel: '돌봄내역',
          }}
        />
        <Tab.Screen
          name="마이페이지"
          component={MyPageStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </UserInfoProvider>
  );
} 