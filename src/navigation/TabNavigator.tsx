import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, typography } from '../styles/theme';

import CareMapScreen from '../screens/map/CareMapScreen';
import ChatStackNavigator from './chat/ChatStackNavigator';
import CareStackNavigator from './care/CareStackNavigator';
import MyPageScreen from '../screens/mypage/MyPageScreen';
import { TabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: typography.caption,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="홈"
        component={CareMapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="채팅"
        component={ChatStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CareHistory"
        component={CareStackNavigator}
        options={{
          tabBarLabel: '돌봄내역',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MyPageScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator; 