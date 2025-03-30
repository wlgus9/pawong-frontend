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
  ActivityIndicator,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import KakaoIcon from '../../assets/images/kakao.svg';
import NaverIcon from '../../assets/images/naver.svg';
import GoogleIcon from '../../assets/images/google.svg';
import { colors, spacing, typography, commonStyles } from '../../styles/theme';
import { signup, checkEmail } from '../../utils/api/authApi';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { AuthStackParamList, UserType } from '../../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  const [showDomainDropdown, setShowDomainDropdown] = useState(false);
  const [isDirectInput, setIsDirectInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

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
    setShowDomainDropdown(false);
  };

  const getEmail = () => {
    const domain = isDirectInput ? customDomain : emailDomain;
    return `${emailId}@${domain}`;
  };

  const handleEmailCheck = async () => {
    if (!emailId) {
      setEmailCheckMessage('이메일을 입력해주세요.');
      setIsEmailValid(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await checkEmail(getEmail());
      
      if (response?.code === 200) {
        setEmailCheckMessage(response.message);
        setIsEmailValid(true);
      } else if (response?.code === 400) {
        setEmailCheckMessage(response.message);
        setIsEmailValid(false);
      } else {
        setEmailCheckMessage('이메일 확인 중 오류가 발생했습니다.');
        setIsEmailValid(false);
      }
    } catch (error) {
      setEmailCheckMessage('이메일 확인 중 오류가 발생했습니다.');
      setIsEmailValid(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!isEmailValid) {
      Alert.alert('알림', '사용 가능한 이메일을 입력해주세요.');
      return;
    }

    if (!userName || !password || !confirmPassword || !phone) {
      Alert.alert('알림', '모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('알림', '비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      setIsLoading(true);
      const success = await signup({
        email: getEmail(),
        password,
        userName,
        phone,
        userType,
      });

      if (success) {
        Alert.alert('알림', '회원가입이 완료되었습니다.', [
          { text: '확인', onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        Alert.alert('오류', '회원가입에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (platform: string) => {
    Alert.alert('소셜 회원가입', `${platform} 회원가입이 아직 구현되지 않았습니다.`);
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const passwordsDontMatch = password && confirmPassword && password !== confirmPassword;

  return (
    <SafeAreaView style={commonStyles.container}>
      <KeyboardAwareScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
      >
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
              style={[styles.emailInput, { flex: 0.8, marginRight: spacing.sm }]}
              placeholder="이메일"
              value={emailId}
              onChangeText={(text) => {
                setEmailId(text);
                setEmailCheckMessage('');
                setIsEmailValid(false);
              }}
              autoCapitalize="none"
            />
            <Text style={styles.emailAt}>@</Text>
            <View style={styles.domainContainer}>
              {isDirectInput ? (
                <TextInput
                  style={[commonStyles.input, styles.emailInput]}
                  placeholder="도메인 입력"
                  value={customDomain}
                  onChangeText={setCustomDomain}
                  autoCapitalize="none"
                />
              ) : (
                <View style={styles.domainSelectContainer}>
                  <TouchableOpacity
                    style={styles.domainSelectButton}
                    onPress={() => setShowDomainDropdown(!showDomainDropdown)}
                  >
                    <Text style={styles.domainSelectText}>
                      {emailDomain || '선택'}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color={colors.text} />
                  </TouchableOpacity>
                  {showDomainDropdown && (
                    <View style={styles.domainDropdown}>
                      <ScrollView 
                        nestedScrollEnabled={true}
                        style={styles.domainScrollView}
                        contentContainerStyle={styles.domainScrollContent}
                      >
                        {EMAIL_DOMAINS.map((domain, index) => (
                          <TouchableOpacity
                            key={domain}
                            style={[
                              styles.domainOption,
                              index === EMAIL_DOMAINS.length - 1 && styles.lastDomainOption
                            ]}
                            onPress={() => handleDomainSelect(domain)}
                          >
                            <Text style={styles.domainOptionText}>{domain}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              )}
            </View>
            <TouchableOpacity
              style={[styles.checkButton, isLoading && styles.checkButtonDisabled]}
              onPress={handleEmailCheck}
              disabled={isLoading}
            >
              <Text style={styles.checkButtonText}>
                {isLoading ? '확인 중...' : '중복확인'}
              </Text>
            </TouchableOpacity>
          </View>

          {emailCheckMessage ? (
            <Text style={[
              styles.checkEmailMessage,
              isEmailValid ? styles.checkEmailSuccess : styles.checkEmailError
            ]}>
              {emailCheckMessage}
            </Text>
          ) : null}

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

          <TouchableOpacity
            style={[commonStyles.button, isLoading && commonStyles.buttonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={commonStyles.buttonText}>회원가입</Text>
            )}
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
      </KeyboardAwareScrollView>
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
    marginBottom: spacing.xs,
  },
  emailInput: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    ...typography.body,
    flex: 0.8,
  },
  emailAt: {
    marginHorizontal: spacing.xs,
    ...typography.body,
  },
  domainContainer: {
    flex: 1.8,
    position: 'relative',
    marginRight: spacing.sm,
  },
  domainSelectContainer: {
    position: 'relative',
  },
  domainSelectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 120,
  },
  domainSelectText: {
    ...typography.body,
    color: colors.text,
  },
  passwordContainer: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
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
  checkEmailMessage: {
    ...typography.caption,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  checkEmailSuccess: {
    color: colors.success,
  },
  checkEmailError: {
    color: colors.error,
  },
  checkButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
  },
  checkButtonDisabled: {
    opacity: 0.5,
  },
  checkButtonText: {
    ...typography.caption,
    color: colors.white,
  },
  domainDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 4,
    zIndex: 1000,
    overflow: 'hidden',
  },
  domainScrollView: {
    maxHeight: 200,
  },
  domainScrollContent: {
    flexGrow: 1,
  },
  domainOption: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  domainOptionText: {
    ...typography.body,
    color: colors.text,
  },
  lastDomainOption: {
    borderBottomWidth: 0,
  },
});

export default RegisterScreen; 