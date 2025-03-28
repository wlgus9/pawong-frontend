import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { dummyCarers, Carer } from '../../data/dummyCarers';

const { height } = Dimensions.get('window');

const CareMapScreen = () => {
  const mapRef = useRef<MapView>(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.5665,
    longitude: 126.9780,
  });
  const [selectedCarer, setSelectedCarer] = useState<Carer | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      try {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        if (auth === 'granted') {
          getCurrentLocation();
        } else {
          // 권한이 거부된 경우 기본 위치(서울)로 설정
          setCurrentLocation({
            latitude: 37.5665,
            longitude: 126.9780,
          });
        }
      } catch (error) {
        console.log('Location permission error:', error);
      }
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        console.log('Current location:', newLocation); // 위치 정보 로깅
        setCurrentLocation(newLocation);
        
        // 현재 위치로 지도 이동
        mapRef.current?.animateToRegion({
          ...newLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      },
      (error) => {
        console.log('Location error:', error.code, error.message);
        // 에러 발생 시 기본 위치(서울)로 설정
        const defaultLocation = {
          latitude: 37.5665,
          longitude: 126.9780,
        };
        setCurrentLocation(defaultLocation);
        mapRef.current?.animateToRegion({
          ...defaultLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 15000, 
        maximumAge: 10000,
        forceRequestLocation: true // 강제로 위치 요청
      }
    );
  };

  const handleMarkerPress = (carer: Carer) => {
    setSelectedCarer(carer);
    bottomSheetModalRef.current?.present();
  };

  const handleCloseBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            ...currentLocation,
            latitudeDelta: 0.01, // 더 가까운 줌 레벨
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true} // 현재 위치 표시
          showsMyLocationButton={true} // 현재 위치 버튼 표시
        >
          {dummyCarers.map((carer) => (
            <Marker
              key={carer.id}
              coordinate={carer.location}
              onPress={() => handleMarkerPress(carer)}
            >
              <Image
                source={{ uri: carer.image }}
                style={styles.markerImage}
              />
            </Marker>
          ))}
        </MapView>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={['25%', '50%', '90%']}
          index={1}
          enablePanDownToClose
        >
          {selectedCarer && (
            <BottomSheetScrollView contentContainerStyle={styles.bottomSheetContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseBottomSheet}
              >
                <Text>닫기</Text>
              </TouchableOpacity>
              
              <View style={styles.carerInfo}>
                <Image
                  source={{ uri: selectedCarer.image }}
                  style={styles.carerImage}
                />
                <View style={styles.carerDetails}>
                  <Text style={styles.carerName}>{selectedCarer.name}</Text>
                  <Text style={styles.carInfo}>
                    {selectedCarer.carType} ({selectedCarer.carNumber})
                  </Text>
                  <Text style={styles.rating}>★ {selectedCarer.rating}</Text>
                </View>
              </View>
            </BottomSheetScrollView>
          )}
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  bottomSheetContent: {
    padding: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  carerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  carerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  carerDetails: {
    marginLeft: 16,
  },
  carerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  carInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    color: '#FFB800',
    marginTop: 4,
  },
});

export default CareMapScreen; 