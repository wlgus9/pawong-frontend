import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, UserType } from '../../types/navigation';
import { colors, spacing, typography, commonStyles } from '../../styles/theme';

type UserTypeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'UserType'>;

const UserTypeScreen = () => {
  const navigation = useNavigation<UserTypeScreenNavigationProp>();

  const handleUserTypeSelect = (userType: UserType) => {
    navigation.navigate('Register', { userType });
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, typography.h1]}>회원가입</Text>
        <Text style={styles.subtitle}>회원 유형을 선택해주세요</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.caregiverButton]}
          onPress={() => handleUserTypeSelect(UserType.CAREGIVER)}
        >
          <Text style={[styles.buttonText, typography.h2]}>돌봄이</Text>
          <Text style={[styles.buttonDescription, typography.body]}>
            반려동물을 돌보는 서비스를{'\n'}제공하고 싶어요
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.petOwnerButton]}
          onPress={() => handleUserTypeSelect(UserType.KEEPER)}
        >
          <Text style={[styles.buttonText, typography.h2]}>키움이</Text>
          <Text style={[styles.buttonDescription, typography.body]}>
            반려동물을 맡기고{'\n'}돌봄 서비스를 받고 싶어요
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginButtonText}>이미 계정이 있으신가요? 로그인</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  buttonContainer: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
    gap: spacing.xl,
  },
  button: {
    padding: spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
  },
  caregiverButton: {
    backgroundColor: colors.primary,
  },
  petOwnerButton: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.white,
    marginBottom: spacing.sm,
  },
  buttonDescription: {
    color: colors.white,
    textAlign: 'center',
    opacity: 0.8,
  },
  loginButton: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  loginButtonText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default UserTypeScreen; 