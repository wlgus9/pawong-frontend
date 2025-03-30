import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '../../utils/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { fetchUserInfo, updateNickname, deleteAccount } from '../../utils/api/mypageApi';
import { UserInfo } from '../../types/api';
import { useAuth } from '../../contexts/AuthContext';

type MyPageScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type MenuItemProps = {
  icon: string;
  title: string;
  onPress: () => void;
  color?: string;
};

// 더미 데이터
const dummyUser = {
  nickname: '행복한키움이',
  email: 'hong@example.com',
  phone: '010-1234-5678',
  type: '키움이',
  joinDate: '2024.03.15',
  profileImage: 'https://via.placeholder.com/100',
};

const dummyPets = [
  {
    id: '1',
    name: '몽이',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: '까미',
    image: 'https://via.placeholder.com/150',
  },
];

const MyPageScreen = () => {
  const navigation = useNavigation<MyPageScreenNavigationProp>();
  const { stopTokenRefresh } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [nickname, setNickname] = useState('');
  const [tempNickname, setTempNickname] = useState('');

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      setIsLoading(true);
      const response = await fetchUserInfo();
      console.log('마이페이지 응답:', response);
      if (response) {
        setUserInfo(response);
        setNickname(response.nickName || response.userName);
        setTempNickname(response.nickName || response.userName);
      } else {
        Alert.alert('오류', '사용자 정보를 불러올 수 없습니다.');
      }
    } catch (error) {
      console.error('사용자 정보 조회 중 오류:', error);
      Alert.alert('오류', '사용자 정보를 불러올 수 없습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.removeTokens();
      stopTokenRefresh();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      const success = await deleteAccount();
      if (success) {
        await auth.removeTokens();
        Alert.alert('알림', '회원 탈퇴가 완료되었습니다.');
      } else {
        Alert.alert('오류', '회원 탈퇴에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '회원 탈퇴 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditNickname = () => {
    setIsEditingNickname(true);
    setTempNickname(nickname);
  };

  const handleSaveNickname = async () => {
    try {
      setIsLoading(true);
      const success = await updateNickname(tempNickname);
      if (success) {
        setNickname(tempNickname);
        setIsEditingNickname(false);
        Alert.alert('알림', '닉네임이 변경되었습니다.');
        loadUserInfo();
      } else {
        Alert.alert('오류', '닉네임 변경에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '닉네임 변경 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelNickname = () => {
    setIsEditingNickname(false);
    setTempNickname(nickname);
  };

  const MenuItem = ({ icon, title, onPress, color = colors.text }: MenuItemProps) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      disabled={isLoading}
    >
      <View style={styles.menuContent}>
        <Ionicons name={icon} size={24} color={color} />
        <Text style={[styles.menuText, { color }]}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  if (isLoading && !userInfo) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!userInfo) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>사용자 정보를 불러올 수 없습니다.</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadUserInfo}>
            <Text style={styles.retryButtonText}>다시 시도</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <TouchableOpacity style={styles.profileImageContainer}>
              <Image
                source={
                  userInfo.userType === 2 && userInfo.pets[0]?.photo
                    ? { uri: userInfo.pets[0].photo }
                    : require('../../assets/images/default-profile.png')
                }
                style={styles.profileImage}
              />
              {userInfo.userType === 2 && (
                <View style={styles.editImageButton}>
                  <Ionicons name="camera" size={16} color={colors.white} />
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.profileInfo}>
              {isEditingNickname ? (
                <View style={styles.nicknameEditContainer}>
                  <TextInput
                    style={styles.nicknameInput}
                    value={tempNickname}
                    onChangeText={setTempNickname}
                    autoFocus
                  />
                  <View style={styles.nicknameEditButtons}>
                    <TouchableOpacity
                      style={[styles.nicknameButton, styles.saveButton]}
                      onPress={handleSaveNickname}
                      disabled={isLoading}
                    >
                      <Text style={styles.nicknameButtonText}>저장</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.nicknameButton, styles.cancelButton]}
                      onPress={handleCancelNickname}
                      disabled={isLoading}
                    >
                      <Text style={[styles.nicknameButtonText, styles.cancelButtonText]}>
                        취소
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity onPress={handleEditNickname}>
                  <View style={styles.nicknameContainer}>
                    <Text style={styles.name}>{nickname}</Text>
                    <Ionicons name="pencil" size={16} color={colors.textSecondary} />
                  </View>
                </TouchableOpacity>
              )}
              <Text style={styles.userType}>
                {userInfo.userType === 2 ? '키움이' : '돌봄이'}
              </Text>
            </View>
          </View>
        </View>

        {userInfo.userType === 2 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>나의 반려동물</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('PetManage')}
              >
                <Ionicons name="add" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.petsGrid}>
              {userInfo.pets.map(pet => (
                <TouchableOpacity
                  key={pet.id}
                  style={styles.petCard}
                  onPress={() => Alert.alert('알림', '준비 중인 기능입니다.')}
                >
                  <Image source={{ uri: pet.photo }} style={styles.petImage} />
                  <Text style={styles.petName}>{pet.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>설정</Text>
          <MenuItem
            icon="person-outline"
            title="회원정보 수정"
            onPress={() => Alert.alert('알림', '준비 중인 기능입니다.')}
          />
          <MenuItem
            icon="notifications-outline"
            title="알림 설정"
            onPress={() => Alert.alert('알림', '준비 중인 기능입니다.')}
          />
          <MenuItem
            icon="lock-closed-outline"
            title="개인정보 설정"
            onPress={() => Alert.alert('알림', '준비 중인 기능입니다.')}
          />
          <MenuItem
            icon="help-circle-outline"
            title="고객센터"
            onPress={() => Alert.alert('알림', '준비 중인 기능입니다.')}
          />
        </View>

        <View style={styles.section}>
          <MenuItem
            icon="log-out-outline"
            title="로그아웃"
            onPress={handleLogout}
            color={colors.primary}
          />
          <MenuItem
            icon="trash-outline"
            title="회원탈퇴"
            onPress={handleDeleteAccount}
            color={colors.error}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: spacing.md,
  },
  editImageButton: {
    position: 'absolute',
    right: spacing.md,
    bottom: 0,
    backgroundColor: colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  nicknameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  nicknameEditContainer: {
    marginBottom: spacing.xs,
  },
  nicknameInput: {
    ...typography.h2,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: spacing.xs,
    marginBottom: spacing.xs,
  },
  nicknameEditButtons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  nicknameButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  cancelButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nicknameButtonText: {
    ...typography.caption,
    color: colors.white,
  },
  cancelButtonText: {
    color: colors.text,
  },
  name: {
    ...typography.h2,
    color: colors.text,
  },
  userType: {
    ...typography.body,
    color: colors.textSecondary,
  },
  section: {
    marginTop: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.textSecondary,
    padding: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    ...typography.body,
    marginLeft: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  addButton: {
    padding: spacing.xs,
  },
  petsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.sm,
    gap: spacing.sm,
  },
  petCard: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  petImage: {
    width: '100%',
    height: '80%',
  },
  petName: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
    padding: spacing.xs,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
  },
  retryButtonText: {
    ...typography.body,
    color: colors.white,
  },
});

export default MyPageScreen; 