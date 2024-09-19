// BookingScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';

const BookingScreen = ({ route }) => {
  const { court } = route.params;

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      dates.push(formattedDate);
    }
    return dates;
  };

  const dates = generateDates();

  const handleDatePress = (date) => {
    Alert.alert(`Selected Date: ${date}`);
    // Implement logic to show available times for the selected date
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: court.image }} style={styles.image} />
      <View style={styles.separator} />
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{court.name}</Text>
        <Text style={styles.price}>${court.PricePerPersonDollar}/hour</Text>
      </View>
      <Text style={styles.location}>{court.Location}</Text>
      <Text style={styles.dateHeader}>Available Dates:</Text>
      <FlatList
        data={dates}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.dateButton} onPress={() => handleDatePress(item)}>
            <Text style={styles.dateButtonText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.dateList}
        scrollEnabled={false} // Disable internal scrolling for FlatList
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    width: '100%',
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: 18,
    color: '#555',
    alignSelf: 'flex-start',
    marginBottom: 10, // Added margin for spacing
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  dateHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  dateList: {
    marginTop: 10,
  },
  dateButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '100%',
  },
  dateButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default BookingScreen;
