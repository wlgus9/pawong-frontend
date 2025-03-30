import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPageScreen from '../../screens/mypage/MyPageScreen';
import UserInfoEditScreen from '../../screens/mypage/UserInfoEditScreen';
import { MyPageStackParamList } from '../../types/navigation';

const Stack = createNativeStackNavigator<MyPageStackParamList>();

export default function MyPageStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyPage" component={MyPageScreen} />
      <Stack.Screen
        name="UserInfoEdit"
        component={UserInfoEditScreen}
        options={{
          headerShown: true,
          title: '회원정보 수정',
        }}
      />
    </Stack.Navigator>
  );
} 