export type CareStatus = 
  | '돌봄 취소'
  | '돌봄 대기 중'
  | '돌봄 진행 중'
  | '돌봄 완료';

export interface CareRecord {
  id: string;
  status: CareStatus;
  petName: string;
  petType: string;
  caregiverName: string;
  startDate: Date;
  endDate: Date;
  location: string;
  price: number;
  services: string[];
  specialRequests?: string;
}

export interface CareDetails extends CareRecord {
  petAge: number;
  petGender: '수컷' | '암컷';
  petBreed: string;
  caregiverImage: string;
  caregiverRating: number;
  caregiverReviews: number;
  paymentMethod: string;
  cancellationReason?: string;
} 