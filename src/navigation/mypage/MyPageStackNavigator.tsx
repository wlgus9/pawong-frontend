import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPageScreen from '../../screens/mypage/MyPageScreen';
import { MyPageStackParamList } from '../../types/navigation';

const Stack = createNativeStackNavigator<MyPageStackParamList>();

export default function MyPageStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="MyPageMain"
        component={MyPageScreen}
        options={{
          title: '마이페이지',
        }}
      />
    </Stack.Navigator>
  );
} 