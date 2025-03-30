import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type PetManageScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Gender = '수컷' | '암컷';

interface Pet {
  id: string;
  name: string;
  age: string;
  gender: Gender;
  species: string;
  note: string;
  image: string;
}

const PetManageScreenContent = () => {
  const navigation = useNavigation<PetManageScreenNavigationProp>();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('수컷');
  const [species, setSpecies] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name || !age || !species) {
      Alert.alert('알림', '필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      // TODO: API 호출로 반려동물 정보 저장
      Alert.alert('알림', '반려동물 정보가 저장되었습니다.', [
        {
          text: '확인',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('오류', '저장 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>반려동물 등록</Text>
        <TouchableOpacity onPress={handleSave} disabled={isLoading}>
          <Text style={styles.saveButton}>저장</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Ionicons name="camera" size={32} color={colors.textSecondary} />
            <Text style={styles.imageText}>사진 추가</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>이름 *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="반려동물의 이름을 입력하세요"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>나이 *</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="나이를 입력하세요"
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>성별 *</Text>
            <View style={styles.genderButtons}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === '수컷' && styles.genderButtonActive,
                ]}
                onPress={() => setGender('수컷')}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    gender === '수컷' && styles.genderButtonTextActive,
                  ]}
                >
                  수컷
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === '암컷' && styles.genderButtonActive,
                ]}
                onPress={() => setGender('암컷')}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    gender === '암컷' && styles.genderButtonTextActive,
                  ]}
                >
                  암컷
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>종 *</Text>
            <TextInput
              style={styles.input}
              value={species}
              onChangeText={setSpecies}
              placeholder="예: 말티즈, 시츄, 코리안 숏헤어"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>특이사항</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={note}
              onChangeText={setNote}
              placeholder="특이사항을 입력하세요"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  saveButton: {
    ...typography.body,
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  form: {
    padding: spacing.md,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.sm,
    backgroundColor: colors.white,
  },
  textArea: {
    height: 100,
    paddingTop: spacing.sm,
  },
  genderButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  genderButton: {
    flex: 1,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  genderButtonText: {
    ...typography.body,
    color: colors.text,
  },
  genderButtonTextActive: {
    color: colors.white,
  },
});

const PetManageScreen = () => {
  return <PetManageScreenContent />;
};

export default PetManageScreen; 