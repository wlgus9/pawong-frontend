export interface Carer {
  id: string;
  name: string;
  image: string;
  carType: string;
  carNumber: string;
  rating: number;
  location: {
    latitude: number;
    longitude: number;
  };
}

export const dummyCarers: Carer[] = [
  {
    id: '1',
    name: '김돌봄',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    carType: 'Tesla Model 3',
    carNumber: '12가 3456',
    rating: 4.8,
    location: {
      latitude: 37.5665,
      longitude: 126.9780,
    },
  },
  {
    id: '2',
    name: '이돌봄',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    carType: 'Hyundai IONIQ 5',
    carNumber: '34나 5678',
    rating: 4.9,
    location: {
      latitude: 37.5668,
      longitude: 126.9783,
    },
  },
  {
    id: '3',
    name: '박돌봄',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    carType: 'KIA EV6',
    carNumber: '56다 7890',
    rating: 4.7,
    location: {
      latitude: 37.5662,
      longitude: 126.9777,
    },
  },
]; 