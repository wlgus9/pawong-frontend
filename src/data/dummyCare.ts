import { CareDetails } from '../types/care';

export const dummyCareRecords: CareDetails[] = [
  {
    id: '1',
    status: '돌봄 완료',
    petName: '몽이',
    petType: '강아지',
    petAge: 3,
    petGender: '수컷',
    petBreed: '말티즈',
    caregiverName: '김돌봄',
    caregiverImage: 'https://i.pravatar.cc/150?img=5',
    caregiverRating: 4.8,
    caregiverReviews: 56,
    startDate: new Date('2024-03-15T10:00:00'),
    endDate: new Date('2024-03-15T18:00:00'),
    location: '서울시 강남구',
    price: 80000,
    services: ['산책', '배식', '약 복용 관리'],
    paymentMethod: '신용카드',
  },
  {
    id: '2',
    status: '돌봄 진행 중',
    petName: '나비',
    petType: '고양이',
    petAge: 2,
    petGender: '암컷',
    petBreed: '러시안 블루',
    caregiverName: '이돌봄',
    caregiverImage: 'https://i.pravatar.cc/150?img=6',
    caregiverRating: 4.9,
    caregiverReviews: 42,
    startDate: new Date('2024-03-20T09:00:00'),
    endDate: new Date('2024-03-20T19:00:00'),
    location: '서울시 서초구',
    price: 100000,
    services: ['배식', '화장실 청소', '놀이 활동'],
    specialRequests: '낯을 많이 가리니 천천히 다가가 주세요',
    paymentMethod: '카카오페이',
  },
  {
    id: '3',
    status: '돌봄 대기 중',
    petName: '초코',
    petType: '강아지',
    petAge: 1,
    petGender: '수컷',
    petBreed: '포메라니안',
    caregiverName: '박돌봄',
    caregiverImage: 'https://i.pravatar.cc/150?img=7',
    caregiverRating: 4.7,
    caregiverReviews: 31,
    startDate: new Date('2024-03-25T11:00:00'),
    endDate: new Date('2024-03-25T17:00:00'),
    location: '서울시 송파구',
    price: 60000,
    services: ['산책', '배식', '기본 케어'],
    specialRequests: '산책 시 목줄 필수입니다',
    paymentMethod: '계좌이체',
  },
  {
    id: '4',
    status: '돌봄 취소',
    petName: '루이',
    petType: '강아지',
    petAge: 4,
    petGender: '수컷',
    petBreed: '비숑프리제',
    caregiverName: '최돌봄',
    caregiverImage: 'https://i.pravatar.cc/150?img=8',
    caregiverRating: 4.6,
    caregiverReviews: 27,
    startDate: new Date('2024-03-18T13:00:00'),
    endDate: new Date('2024-03-18T18:00:00'),
    location: '서울시 마포구',
    price: 50000,
    services: ['산책', '배식'],
    cancellationReason: '갑작스러운 일정 변경',
    paymentMethod: '신용카드',
  },
  // 1월 데이터
  {
    id: '5',
    status: '돌봄 완료',
    petName: '해피',
    petType: '강아지',
    petAge: 2,
    petGender: '암컷',
    petBreed: '시바견',
    caregiverName: '정돌봄',
    caregiverImage: 'https://i.pravatar.cc/150?img=9',
    caregiverRating: 4.9,
    caregiverReviews: 38,
    startDate: new Date('2024-01-10T09:00:00'),
    endDate: new Date('2024-01-10T17:00:00'),
    location: '서울시 용산구',
    price: 70000,
    services: ['산책', '배식', '놀이 활동'],
    paymentMethod: '신용카드',
  },
  {
    id: '6',
    status: '돌봄 완료',
    petName: '콩이',
    petType: '고양이',
    petAge: 1,
    petGender: '수컷',
    petBreed: '페르시안',
    caregiverName: '한돌봄',
    caregiverImage: 'https://i.pravatar.cc/150?img=10',
    caregiverRating: 4.7,
    caregiverReviews: 45,
    startDate: new Date('2024-01-25T10:00:00'),
    endDate: new Date('2024-01-25T18:00:00'),
    location: '서울시 성동구',
    price: 90000,
    services: ['배식', '화장실 청소', '놀이 활동'],
    paymentMethod: '카카오페이',
  },
  // 2월 데이터
  {
    id: '7',
    status: '돌봄 완료',
    petName: '달이',
    petType: '강아지',
    petAge: 5,
    petGender: '암컷',
    petBreed: '골든리트리버',
    caregiverName: '송돌봄',
    caregiverImage: 'https://i.pravatar.cc/150?img=11',
    caregiverRating: 4.8,
    caregiverReviews: 62,
    startDate: new Date('2024-02-05T08:00:00'),
    endDate: new Date('2024-02-05T18:00:00'),
    location: '서울시 강서구',
    price: 110000,
    services: ['산책', '배식', '약 복용 관리', '놀이 활동'],
    paymentMethod: '신용카드',
  },
  {
    id: '8',
    status: '돌봄 완료',
    petName: '별이',
    petType: '고양이',
    petAge: 3,
    petGender: '암컷',
    petBreed: '스코티시폴드',
    caregiverName: '임돌봄',
    caregiverImage: 'https://i.pravatar.cc/150?img=12',
    caregiverRating: 4.9,
    caregiverReviews: 51,
    startDate: new Date('2024-02-15T11:00:00'),
    endDate: new Date('2024-02-15T19:00:00'),
    location: '서울시 중구',
    price: 95000,
    services: ['배식', '화장실 청소', '놀이 활동'],
    specialRequests: '낯선 사람을 무서워해요',
    paymentMethod: '계좌이체',
  },
  {
    id: '9',
    status: '돌봄 완료',
    petName: '멍멍이',
    petType: '강아지',
    petBreed: '골든 리트리버',
    petAge: 5,
    petGender: '암컷',
    caregiverName: '김보호',
    caregiverImage: 'https://picsum.photos/200',
    caregiverRating: 4.8,
    caregiverReviews: 127,
    startDate: new Date('2025-01-15T10:00:00'),
    endDate: new Date('2025-01-15T18:00:00'),
    location: '서울시 강남구',
    price: 50000,
    paymentMethod: '계좌이체',
    services: ['산책', '급식', '청소'],
  },
  {
    id: '10',
    status: '돌봄 진행 중',
    petName: '냥이',
    petType: '고양이',
    petBreed: '페르시안',
    petAge: 3,
    petGender: '암컷',
    caregiverName: '이보호',
    caregiverImage: 'https://picsum.photos/201',
    caregiverRating: 4.9,
    caregiverReviews: 89,
    startDate: new Date('2025-02-20T09:00:00'),
    endDate: new Date('2025-02-20T17:00:00'),
    location: '서울시 서초구',
    price: 45000,
    paymentMethod: '계좌이체',
    services: ['급식', '청소', '놀이'],
  },
  {
    id: '11',
    status: '돌봄 대기 중',
    petName: '토토',
    petType: '강아지',
    petBreed: '시바견',
    petAge: 1,
    petGender: '수컷',
    caregiverName: '박보호',
    caregiverImage: 'https://picsum.photos/202',
    caregiverRating: 4.7,
    caregiverReviews: 156,
    startDate: new Date('2025-03-10T11:00:00'),
    endDate: new Date('2025-03-10T19:00:00'),
    location: '서울시 송파구',
    price: 48000,
    paymentMethod: '계좌이체',
    services: ['산책', '급식', '청소', '놀이'],
  },
]; 