import { createNavigationContainerRef, NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    if (params?.type === 'reset') {
      navigationRef.reset({
        index: 0,
        routes: [{ name }],
      });
    } else {
      navigationRef.navigate(name, params);
    }
  }
} 