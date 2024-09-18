// BookingScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookingScreen = ({ route }) => {
  const { court } = route.params; // Get court info from navigation params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking for {court.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
