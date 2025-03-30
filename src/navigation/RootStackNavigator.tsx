import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import AuthStackNavigator from './auth/AuthStackNavigator';
import TabNavigator from './TabNavigator';
import PetManageScreen from '../screens/mypage/PetManageScreen';
import UserInfoEditScreen from '../screens/mypage/UserInfoEditScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen
        name="PetManage"
        component={PetManageScreen}
        options={{
          headerShown: true,
          title: '반려동물 관리',
        }}
      />
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
};

export default RootStackNavigator; 