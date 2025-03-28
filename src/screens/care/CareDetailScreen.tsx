import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../styles/theme';
import { dummyCareRecords } from '../../data/dummyCare';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { RouteProp, useRoute } from '@react-navigation/native';
import { CareStackParamList } from '../../types/navigation';

type CareDetailRouteProp = RouteProp<CareStackParamList, 'CareDetail'>;

const CareDetailScreen = () => {
  const route = useRoute<CareDetailRouteProp>();
  const record = dummyCareRecords.find(r => r.id === route.params.recordId);

  if (!record) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>돌봄 내역을 찾을 수 없습니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>반려동물 정보</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>이름</Text>
            <Text style={styles.value}>{record.petName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>종류</Text>
            <Text style={styles.value}>{record.petType}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>품종</Text>
            <Text style={styles.value}>{record.petBreed}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>나이</Text>
            <Text style={styles.value}>{record.petAge}살</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>성별</Text>
            <Text style={styles.value}>{record.petGender}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>돌보미 정보</Text>
          <View style={styles.caregiverInfo}>
            <Image
              source={{ uri: record.caregiverImage }}
              style={styles.caregiverImage}
            />
            <View style={styles.caregiverDetails}>
              <Text style={styles.caregiverName}>{record.caregiverName}</Text>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>★ {record.caregiverRating}</Text>
                <Text style={styles.reviewCount}>
                  리뷰 {record.caregiverReviews}개
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>돌봄 정보</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>상태</Text>
            <Text style={[styles.value, { color: getStatusColor(record.status) }]}>
              {record.status}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>날짜</Text>
            <Text style={styles.value}>
              {format(record.startDate, 'yyyy년 M월 d일', { locale: ko })}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>시간</Text>
            <Text style={styles.value}>
              {format(record.startDate, 'a h:mm', { locale: ko })} - 
              {format(record.endDate, ' a h:mm', { locale: ko })}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>장소</Text>
            <Text style={styles.value}>{record.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>서비스</Text>
            <Text style={styles.value}>{record.services.join(', ')}</Text>
          </View>
          {record.specialRequests && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>특이사항</Text>
              <Text style={styles.value}>{record.specialRequests}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>결제 정보</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>결제 수단</Text>
            <Text style={styles.value}>{record.paymentMethod}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>결제 금액</Text>
            <Text style={[styles.value, styles.price]}>
              {record.price.toLocaleString()}원
            </Text>
          </View>
        </View>

        {record.status === '돌봄 취소' && record.cancellationReason && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>취소 사유</Text>
            <Text style={styles.cancellationReason}>
              {record.cancellationReason}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case '돌봄 완료':
      return colors.success;
    case '돌봄 진행 중':
      return colors.primary;
    case '돌봄 대기 중':
      return colors.warning;
    case '돌봄 취소':
      return colors.error;
    default:
      return colors.textSecondary;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  value: {
    ...typography.body,
    color: colors.text,
    flex: 2,
    textAlign: 'right',
  },
  caregiverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caregiverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing.md,
  },
  caregiverDetails: {
    flex: 1,
  },
  caregiverName: {
    ...typography.h3,
    color: colors.text,
    marginBottom: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...typography.body,
    color: colors.text,
    marginRight: spacing.sm,
  },
  reviewCount: {
    ...typography.body,
    color: colors.textSecondary,
  },
  price: {
    ...typography.h2,
    color: colors.primary,
  },
  cancellationReason: {
    ...typography.body,
    color: colors.error,
  },
});

export default CareDetailScreen; 