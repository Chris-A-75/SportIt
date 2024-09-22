import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BookingScreen = ({ route }) => {
  const { court } = route.params;
  const [selectedCourtType, setSelectedCourtType] = useState(court.courtTypes[0]); // Default to the first court type

  const handleChooseTime = () => {
    Alert.alert(`Selected Court Type: ${selectedCourtType}`);
    // Navigate to time selection logic or screen
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: court.courtPictureLink }} style={styles.image} />
      <View style={styles.separator} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{court.name}</Text>
          <Text style={styles.price}>${court.pricePerPersonDollar}/hour</Text>
        </View>
        <Text style={styles.location}>{court.mainDisplayLocation}</Text>

        {/* Court Type Picker */}
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

        <Text style={styles.infoLabel}>Open From:</Text>
        <Text style={styles.infoText}>{court.openFrom}</Text>
        <Text style={styles.infoLabel}>Open To:</Text>
        <Text style={styles.infoText}>{court.openTo}</Text>
        <Text style={styles.infoLabel}>Parking Available:</Text>
        <Text style={styles.infoText}>{court.hasParkingSpace ? "Yes" : "No"}</Text>
        <Text style={styles.infoLabel}>Indoor/Outdoor:</Text>
        <Text style={styles.infoText}>{court.indoorsOrOutdoors}</Text>
      </ScrollView>

      <TouchableOpacity style={styles.chooseTimeButton} onPress={handleChooseTime}>
        <Text style={styles.chooseTimeButtonText}>Choose Time to Book</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  scrollContainer: {
    paddingBottom: 100, // Ensure space for the button
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
    backgroundColor: '#f8f9fa', // Light background for contrast
    borderRadius: 40, // Rounded corners
    borderColor: '#ccc', // Border color
    borderWidth: 1, // Border width
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  chooseTimeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 123, 255, 0.9)', // Semi-transparent background
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  chooseTimeButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default BookingScreen;
