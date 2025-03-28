import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CareHistoryScreen from '../../screens/care/CareHistoryScreen';
import CareDetailScreen from '../../screens/care/CareDetailScreen';
import { colors, typography } from '../../styles/theme';
import { CareStackParamList } from '../../types/navigation';

const Stack = createNativeStackNavigator<CareStackParamList>();

const CareStackNavigator = () => {
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
        name="CareList"
        component={CareHistoryScreen}
        options={{
          title: '돌봄내역',
        }}
      />
      <Stack.Screen
        name="CareDetail"
        component={CareDetailScreen}
        options={{
          title: '돌봄 상세내역',
        }}
      />
    </Stack.Navigator>
  );
};

export default CareStackNavigator; 