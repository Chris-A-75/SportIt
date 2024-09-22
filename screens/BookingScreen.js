import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BookingScreen = ({ route }) =>  {
  const { court } = route.params;
  const [selectedCourtType, setSelectedCourtType] = useState(court.courtTypes[0]); // Default to the first court type

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    for (let i = 0; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = `${String(date.getDate()).padStart(2, '0')} ${monthNames[date.getMonth()]}`;
      dates.push(formattedDate);
    }
    return dates;
  };

  const dates = generateDates();

  const handleDatePress = (date) => {
    Alert.alert(`Selected Date: ${date}, Court Type: ${selectedCourtType}`);
    // Implement logic to show available times for the selected date and court type
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: court.courtPictureLink }} style={styles.image} />
      <View style={styles.separator} />
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{court.name}</Text>
        <Text style={styles.price}>${court.pricePerPersonDollar}/hour</Text>
      </View>
      <Text style={styles.location}>{court.mainDisplayLocation}</Text>

      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Court Type:</Text>
        <Picker
          selectedValue={selectedCourtType}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCourtType(itemValue)}
        >
          {court.courtTypes.map((type, index) => (
            <Picker.Item key={index} label={type} value={type} />
          ))}
        </Picker>
      </View>

      <View style={styles.dateHeaderContainer}>
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
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  dropdownContainer: {
    marginVertical: 15,
    width: '100%',
  },
  dropdownLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
  },
  dateHeaderContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  dateHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  dateList: {
    marginTop: 10,
  },
  dateButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  dateButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default BookingScreen;
