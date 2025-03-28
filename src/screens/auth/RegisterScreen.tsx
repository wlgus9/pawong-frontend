import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import KakaoIcon from '../../assets/images/kakao.svg';
import NaverIcon from '../../assets/images/naver.svg';
import GoogleIcon from '../../assets/images/google.svg';
import { colors, spacing, typography, commonStyles } from '../../styles/theme';
import { signup } from '../../utils/api';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { AuthStackParamList, UserType } from '../../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;
type RegisterScreenRouteProp = RouteProp<AuthStackParamList, 'Register'>;

const EMAIL_DOMAINS = [
  'naver.com',
  'gmail.com',
  'daum.net',
  'hanmail.net',
  'kakao.com',
  '직접입력',
];

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const route = useRoute<RegisterScreenRouteProp>();
  const userType = route.params?.userType;

  const [userName, setUserName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [isDirectInput, setIsDirectInput] = useState(false);

  // 화면 포커스가 변경될 때 초기화
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (!navigation.isFocused()) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      };
    }, [navigation])
  );

  useEffect(() => {
    // route.params가 없거나 userType이 없는 경우
    if (!route.params || !route.params.userType) {
      navigation.replace('UserType');
    }
  }, [navigation, route.params]);

  // userType이 없는 경우 렌더링하지 않음
  if (!userType) {
    return null;
  }

  const handleDomainSelect = (domain: string) => {
    if (domain === '직접입력') {
      setIsDirectInput(true);
      setEmailDomain('');
    } else {
      setIsDirectInput(false);
      setEmailDomain(domain);
    }
    setShowDomainModal(false);
  };

  const getEmail = () => {
    const domain = isDirectInput ? customDomain : emailDomain;
    return `${emailId}@${domain}`;
  };

  const handleRegister = async () => {
    if (!userName || !emailId || !password || !confirmPassword || !phone) {
      Alert.alert('오류', '모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    const email = getEmail();
    const response = await signup({
      email,
      password,
      userName,
      phone,
      userType,
    });

    if (response.success) {
      Alert.alert('성공', '회원가입이 완료되었습니다.', [
        {
          text: '확인',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } else {
      Alert.alert('오류', response.error || '회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleSocialRegister = (platform: string) => {
    Alert.alert('소셜 회원가입', `${platform} 회원가입이 아직 구현되지 않았습니다.`);
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const passwordsDontMatch = password && confirmPassword && password !== confirmPassword;

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, typography.h1]}>회원가입</Text>
          <Text style={styles.subtitle}>
            {userType === UserType.CAREGIVER ? '돌봄이' : '반려동물 주인'}로 가입합니다
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={commonStyles.input}
            placeholder="이름"
            value={userName}
            onChangeText={setUserName}
          />

          <View style={styles.emailContainer}>
            <TextInput
              style={[commonStyles.input, styles.emailInput]}
              placeholder="이메일"
              value={emailId}
              onChangeText={setEmailId}
              autoCapitalize="none"
            />
            <Text style={styles.emailAt}>@</Text>
            {isDirectInput ? (
              <TextInput
                style={[commonStyles.input, styles.emailInput]}
                placeholder="도메인 입력"
                value={customDomain}
                onChangeText={setCustomDomain}
                autoCapitalize="none"
              />
            ) : (
              <TouchableOpacity
                style={styles.domainButton}
                onPress={() => setShowDomainModal(true)}
              >
                <Text style={styles.domainButtonText}>
                  {emailDomain || '선택'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              style={commonStyles.input}
              placeholder="비밀번호"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="oneTimeCode"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={commonStyles.input}
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              textContentType="oneTimeCode"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {passwordsMatch && (
              <Text style={styles.passwordMatchText}>비밀번호가 일치합니다</Text>
            )}
            {passwordsDontMatch && (
              <Text style={styles.passwordMismatchText}>비밀번호가 일치하지 않습니다</Text>
            )}
          </View>

          <TextInput
            style={commonStyles.input}
            placeholder="전화번호"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={commonStyles.button} onPress={handleRegister}>
            <Text style={commonStyles.buttonText}>회원가입</Text>
          </TouchableOpacity>

          <View style={styles.socialLoginContainer}>
            <View style={styles.dividerContainer}>
              <View style={commonStyles.divider} />
              <Text style={styles.socialLoginText}>소셜 계정으로 회원가입</Text>
              <View style={commonStyles.divider} />
            </View>
            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialRegister('카카오')}
              >
                <KakaoIcon width={48} height={48} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.socialButton, styles.naverButton]}
                onPress={() => handleSocialRegister('네이버')}
              >
                <NaverIcon width={48} height={48} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialRegister('구글')}
              >
                <GoogleIcon width={40} height={40} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>이미 계정이 있으신가요? 로그인</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showDomainModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDomainModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>이메일 도메인 선택</Text>
            <FlatList
              data={EMAIL_DOMAINS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.domainItem}
                  onPress={() => handleDomainSelect(item)}
                >
                  <Text style={styles.domainItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
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
  form: {
    padding: spacing.lg,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  emailInput: {
    flex: 1,
    marginBottom: 0,
  },
  emailAt: {
    marginHorizontal: spacing.sm,
    ...typography.body,
  },
  domainButton: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  domainButtonText: {
    ...typography.body,
    color: colors.text,
  },
  passwordContainer: {
    marginBottom: spacing.md,
  },
  passwordMatchText: {
    ...typography.caption,
    color: colors.success,
    marginTop: spacing.xs,
  },
  passwordMismatchText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
    maxHeight: '50%',
  },
  modalTitle: {
    ...typography.h2,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  domainItem: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  domainItemText: {
    ...typography.body,
    color: colors.text,
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
  loginButton: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  loginButtonText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  backButton: {
    position: 'absolute',
    left: spacing.md,
    top: spacing.lg,
    padding: spacing.sm,
  },
});

export default RegisterScreen; 