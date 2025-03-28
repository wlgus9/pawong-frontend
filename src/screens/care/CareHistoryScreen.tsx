import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../styles/theme';
import { dummyCareRecords } from '../../data/dummyCare';
import { CareDetails } from '../../types/care';
import { format, addYears, subYears, isSameYear, isSameMonth } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CareStackParamList } from '../../types/navigation';

type CareNavigationProp = NativeStackNavigationProp<CareStackParamList, 'CareList'>;

const getStatusColor = (status: CareDetails['status']) => {
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

const CareHistoryScreen = () => {
  const navigation = useNavigation<CareNavigationProp>();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedYear(currentYear);
      setSelectedMonth(currentMonth);
    }, [currentYear, currentMonth])
  );

  const handlePrevYear = () => {
    setSelectedYear(prev => prev - 1);
  };

  const handleNextYear = () => {
    if (selectedYear < currentYear) {
      setSelectedYear(prev => prev + 1);
    }
  };

  const handleMonthPress = (month: number) => {
    setSelectedMonth(month);
  };

  const filteredRecords = useMemo(() => {
    return dummyCareRecords.filter(record => {
      const recordDate = new Date(record.startDate);
      return recordDate.getFullYear() === selectedYear && 
             recordDate.getMonth() + 1 === selectedMonth;
    });
  }, [selectedYear, selectedMonth]);

  const renderMonthButton = (month: number) => {
    const isCurrentMonth = selectedYear === currentYear && month === currentMonth;
    const isSelected = month === selectedMonth;
    const isInitialView = selectedYear === currentYear && selectedMonth === currentMonth;
    
    return (
      <TouchableOpacity
        key={month}
        style={[
          styles.monthButton,
          (isSelected || (isCurrentMonth && isInitialView)) && styles.selectedMonthButton,
        ]}
        onPress={() => handleMonthPress(month)}
      >
        <Text style={[
          styles.monthButtonText,
          (isSelected || (isCurrentMonth && isInitialView)) && styles.selectedMonthButtonText,
        ]}>
          {month}월
        </Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.yearSelector}>
        <TouchableOpacity 
          onPress={handlePrevYear}
          style={styles.yearButton}
        >
          <Text style={styles.yearButtonText}>〈</Text>
        </TouchableOpacity>
        <Text style={styles.yearText}>{selectedYear}년</Text>
        <TouchableOpacity 
          onPress={handleNextYear}
          style={[
            styles.yearButton,
            selectedYear >= currentYear && styles.disabledYearButton
          ]}
          disabled={selectedYear >= currentYear}
        >
          <Text style={[
            styles.yearButtonText,
            selectedYear >= currentYear && styles.disabledYearButtonText
          ]}>〉</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.monthScroll}
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map(renderMonthButton)}
      </ScrollView>
    </View>
  );

  const renderCareRecord = ({ item }: { item: CareDetails }) => {
    return (
      <TouchableOpacity
        style={styles.recordItem}
        onPress={() => navigation.navigate('CareDetail', { recordId: item.id })}
      >
        <View style={styles.recordHeader}>
          <View style={styles.petInfo}>
            <Text style={styles.petName}>{item.petName}</Text>
            <Text style={styles.petBreed}>
              {item.petType} · {item.petBreed}
            </Text>
          </View>
          <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>
        
        <View style={styles.caregiverInfo}>
          <Image
            source={{ uri: item.caregiverImage }}
            style={styles.caregiverImage}
          />
          <View style={styles.caregiverDetails}>
            <Text style={styles.caregiverName}>{item.caregiverName}</Text>
            <View style={styles.rating}>
              <Text style={styles.ratingText}>★ {item.caregiverRating}</Text>
              <Text style={styles.reviewCount}>({item.caregiverReviews})</Text>
            </View>
          </View>
        </View>

        <View style={styles.serviceInfo}>
          <Text style={styles.dateTime}>
            {format(item.startDate, 'M월 d일 a h:mm', { locale: ko })} - 
            {format(item.endDate, ' a h:mm', { locale: ko })}
          </Text>
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.price}>{item.price.toLocaleString()}원</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {selectedYear}년 {selectedMonth}월에는{'\n'}돌봄 내역이 없습니다.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredRecords}
        renderItem={renderCareRecord}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  yearSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  yearButton: {
    padding: spacing.sm,
    minWidth: 40,
    alignItems: 'center',
  },
  yearButtonText: {
    ...typography.h2,
    color: colors.text,
    fontSize: 24,
  },
  disabledYearButton: {
    opacity: 0.5,
  },
  disabledYearButtonText: {
    color: colors.textSecondary,
  },
  yearText: {
    ...typography.h2,
    marginHorizontal: spacing.lg,
  },
  monthScroll: {
    marginBottom: spacing.md,
  },
  monthButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.xs,
    borderRadius: spacing.sm,
    backgroundColor: colors.background,
  },
  selectedMonthButton: {
    backgroundColor: colors.primary,
  },
  monthButtonText: {
    ...typography.body1,
    color: colors.text,
  },
  selectedMonthButtonText: {
    color: colors.white,
  },
  contentContainer: {
    padding: spacing.sm,
    flexGrow: 1,
  },
  recordItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    ...typography.h2,
    color: colors.text,
    marginBottom: 2,
  },
  petBreed: {
    ...typography.body,
    color: colors.textSecondary,
  },
  status: {
    ...typography.button,
    fontWeight: '600',
  },
  caregiverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  caregiverImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  caregiverDetails: {
    flex: 1,
  },
  caregiverName: {
    ...typography.body,
    color: colors.text,
    marginBottom: 2,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...typography.caption,
    color: colors.text,
    marginRight: 4,
  },
  reviewCount: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  serviceInfo: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  dateTime: {
    ...typography.body,
    color: colors.text,
    marginBottom: 4,
  },
  location: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  price: {
    ...typography.h2,
    color: colors.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default CareHistoryScreen; 