import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReservationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>예약내역 화면</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default ReservationScreen; 