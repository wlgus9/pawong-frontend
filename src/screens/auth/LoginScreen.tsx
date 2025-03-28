import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '../../types/navigation';
import KakaoIcon from '../../assets/images/kakao.svg';
import NaverIcon from '../../assets/images/naver.svg';
import GoogleIcon from '../../assets/images/google.svg';
import { colors, spacing, typography, commonStyles } from '../../styles/theme';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList & RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('오류', '이메일과 비밀번호를 입력해주세요.');
      return;
    }
    // TODO: 실제 로그인 API 호출
    // 임시로 바로 TabNavigator로 이동
    navigation.reset({
      index: 0,
      routes: [{ name: 'TabNavigator' }],
    });
  };

  const handleSocialLogin = (platform: string) => {
    Alert.alert('소셜 로그인', `${platform} 로그인이 아직 구현되지 않았습니다.`);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, typography.h1]}>로그인</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={commonStyles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={commonStyles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={commonStyles.button} onPress={handleLogin}>
          <Text style={commonStyles.buttonText}>로그인</Text>
        </TouchableOpacity>

        <View style={styles.socialLoginContainer}>
          <View style={styles.dividerContainer}>
            <View style={commonStyles.divider} />
            <Text style={styles.socialLoginText}>소셜 계정으로 로그인</Text>
            <View style={commonStyles.divider} />
          </View>
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('카카오')}
            >
              <KakaoIcon width={48} height={48} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, styles.naverButton]}
              onPress={() => handleSocialLogin('네이버')}
            >
              <NaverIcon width={48} height={48} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('구글')}
            >
              <GoogleIcon width={40} height={40} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('UserType')}
        >
          <Text style={styles.registerButtonText}>
            아직 계정이 없으신가요? 회원가입
          </Text>
        </TouchableOpacity>
      </View>
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
  },
  form: {
    padding: spacing.lg,
  },
  socialLoginContainer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  socialLoginText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginHorizontal: spacing.sm,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: spacing.md,
    gap: spacing.xl,
  },
  socialButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  naverButton: {
    backgroundColor: colors.primary,
    borderRadius: 24,
  },
  registerButton: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  registerButtonText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default LoginScreen; 