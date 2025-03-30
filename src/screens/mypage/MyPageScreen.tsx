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
import { deleteAccount } from '../../utils/api/mypageApi';
import { UserInfo } from '../../types/api';
import { useAuth } from '../../contexts/AuthContext';
import { useUserInfo } from '../../contexts/UserInfoContext';
import { logout } from '../../utils/api/authApi';

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface MenuItemProps {
  icon: string;
  title: string;
  onPress: () => void;
  color?: string;
}

const MyPageScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { stopTokenRefresh } = useAuth();
  const { userInfo, isLoading, loadUserInfo } = useUserInfo();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserInfo();
    });

    return unsubscribe;
  }, [navigation, loadUserInfo]);

  const handleLogout = async () => {
    try {
      const success = await logout();
      if (success) {
        await auth.removeTokens();
        stopTokenRefresh();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        });
      } else {
        Alert.alert('오류', '로그아웃에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
      Alert.alert('오류', '로그아웃 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const success = await deleteAccount();
      if (success) {
        await auth.removeTokens();
        Alert.alert('알림', '회원 탈퇴가 완료되었습니다.');
      } else {
        Alert.alert('오류', '회원 탈퇴에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '회원 탈퇴 중 오류가 발생했습니다.');
    }
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
            <View style={styles.profileImageContainer}>
              <Image
                source={
                  userInfo.userType === 2 && userInfo.pets[0]?.photo
                    ? { uri: userInfo.pets[0].photo }
                    : require('../../assets/images/default-profile.png')
                }
                style={styles.profileImage}
              />
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.nicknameContainer}>
                <Text style={styles.name}>{userInfo.nickName || userInfo.userName}</Text>
              </View>
              <Text style={styles.userType}>
                {userInfo.userType === 2 ? '키움이' : '돌봄이'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.introductionContainer}>
          <View style={styles.introductionBox}>
            <Text style={styles.introductionText}>
              {userInfo.comment || '자기소개가 없습니다.'}
            </Text>
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
            onPress={() => navigation.navigate('UserInfoEdit')}
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
  profileInfo: {
    flex: 1,
  },
  nicknameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
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
  introductionContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  introductionBox: {
    padding: 15,
    minHeight: 100,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  introductionText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default MyPageScreen; 