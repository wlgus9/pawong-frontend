import React from 'react';
import { View, StyleSheet } from 'react-native';
import AuthNavigator from '../../navigation/auth/AuthNavigator';

const MyPageScreen = () => {
  return (
    <View style={styles.container}>
      <AuthNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default MyPageScreen; 