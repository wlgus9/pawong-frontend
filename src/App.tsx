import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigation';
import AuthNavigator from './navigation/auth/AuthNavigator';
import TabNavigator from './navigation/TabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import PetManageScreen from './screens/mypage/PetManageScreen';
import { AuthProvider } from './contexts/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={styles.container}>
        <NavigationContainer>
          <BottomSheetModalProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Auth" component={AuthNavigator} />
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
              <Stack.Screen name="PetManage" component={PetManageScreen} />
            </Stack.Navigator>
          </BottomSheetModalProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App; 