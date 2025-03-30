import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../styles/theme';
import { updateUserInfo } from '../../utils/api/mypageApi';
import { useNavigation } from '@react-navigation/native';
import { useUserInfo } from '../../contexts/UserInfoContext';

const UserInfoEditScreenContent = () => {
  const navigation = useNavigation();
  const { userInfo, loadUserInfo } = useUserInfo();
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickName || userInfo.userName);
      setPhone(userInfo.phone || '');
      setComment(userInfo.comment || '');
    }
  }, [userInfo]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      const updates = {
        nickName: nickname,
        phone: phone,
        comment: comment,
      };

      const response = await updateUserInfo(updates);

      if (response?.code === 200) {
        await loadUserInfo(); // 사용자 정보 다시 로드
        Alert.alert('알림', '회원정보가 수정되었습니다.', [
          { text: '확인', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('오류', '회원정보를 수정할 수 없습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '회원정보를 수정할 수 없습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!userInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>로딩 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.label}>닉네임</Text>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            placeholder="닉네임을 입력해주세요"
            maxLength={20}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>전화번호</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="전화번호를 입력해주세요"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>자기소개</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={comment}
            onChangeText={setComment}
            placeholder="자기소개를 입력해주세요"
            multiline
            maxLength={300}
            textAlignVertical="top"
          />
          <Text style={styles.textCount}>{comment.length}/300</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? '저장 중...' : '저장'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const UserInfoEditScreen = () => {
  return <UserInfoEditScreenContent />;
};

export default UserInfoEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  label: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...typography.body,
  },
  multilineInput: {
    height: 150,
    paddingTop: spacing.md,
  },
  textCount: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    ...typography.button,
    color: colors.white,
  },
}); 