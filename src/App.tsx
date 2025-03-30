import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigation';
import AuthNavigator from './navigation/auth/AuthNavigator';
import TabNavigator from './navigation/TabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, LogBox } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import PetManageScreen from './screens/mypage/PetManageScreen';
import UserInfoEditScreen from './screens/mypage/UserInfoEditScreen';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { navigationRef } from './utils/RootNavigation';

// 모든 경고창 비활성화
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <NavigationContainer 
          ref={navigationRef}
          onStateChange={(state) => {
            // RESET 액션 경고 무시
            console.ignoredYellowBox = ['The action \'RESET\''];
          }}
        >
          <MainNavigator />
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App; 