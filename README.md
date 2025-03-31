# PAWONG (포옹)
포옹이란? 내 위치를 기반으로 반려동물 돌봄 서비스 매칭 플랫폼입니다.

반려동물을 키우는 보호자와 동네 이웃 펫시터를 연결하여 안전하고 신뢰할 수 있는 돌봄 서비스를 제공합니다.

## 구현한 기능
* 회원가입, 로그인, 로그아웃 (보호자/펫시터)
* 마이페이지 회원 정보 조회

## 앞으로 구현할 기능
* 소셜 로그인 (카카오, 네이버, 구글)
* 이미지 업로드 기능
* 반려동물 프로필 관리
* 실시간 위치 기반 펫시터 매칭
* 실시간 채팅
* 예약 및 결제 시스템

## 기술 스택
### Frontend
* Framework: React Native
* Language: TypeScript
* State Management: React Context API
* Navigation: React Navigation v6
* Maps & Location:
    * React Native Maps
    * React Native Geolocation Service
* API Communication: Fetch API
* Authentication: JWT
* Storage: AsyncStorage
* UI Components:
    * React Native Gesture Handler
    * React Native Bottom Sheet
    * React Native SVG
    * React Native Vector Icons
    * React Native Reanimated
    * React Native Keyboard Aware ScrollView  

## 프로젝트 구조도
```
src/
├── assets/         # 이미지, 폰트 등 정적 리소스
├── components/     # 재사용 가능한 컴포넌트
├── config/         # 환경 설정 파일
├── constants/      # 상수 정의
├── contexts/       # React Context 정의
├── navigation/     # 네비게이션 설정
├── screens/        # 화면 컴포넌트
├── styles/         # 공통 스타일 정의
├── types/          # TypeScript 타입 정의
└── utils/          # 유틸리티 함수
```