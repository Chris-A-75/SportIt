import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Alert, ActivityIndicator } from 'react-native';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { doc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore'; // Import Firestore functions
import { FIREBASE_FIRESTORE } from '../firebaseConfig'; // Adjust the import path as necessary

const CheckoutScreen = ({ route, navigation }) => { // Added navigation prop
  const { selectedDate, selectedTimes, court, courtType } = route.params;
  const [numPeople, setNumPeople] = useState(1);
  const [equipmentNeeded, setEquipmentNeeded] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState(''); // State for additional notes
  const [loading, setLoading] = useState(false); // State for loading indicator
  const courtId = court.id; // Assuming court.id is the document ID

  const costPerPerson = court.pricePerOnePersonHalfHour;
  const totalCost = numPeople * (selectedTimes.length * costPerPerson);
  
  const formattedDate = moment(selectedDate, 'DD MMM').format('dddd, MMMM Do YYYY');
  const startTime = moment(selectedTimes[0], 'HH:mm');
  const endTime = moment(selectedTimes[selectedTimes.length - 1], 'HH:mm').add(30, 'minutes');

  // Calculate duration based on the number of selected times
  const totalDurationInHalfHours = selectedTimes.length; // Each selected time represents a half hour
  const totalDurationInHours = totalDurationInHalfHours * 0.5; // Convert half hours to hours

  // Booking data using the correct duration
  const bookingData = { //TODO: CHANGE THIS LATER
    CourtType: courtType,
    DurationInHalfHours: selectedTimes.length + 1,
    Name: "John Doe",
    NeedsEquipment: equipmentNeeded ? "Yes" : "No",
    NumberOfPeople: numPeople,
    Time: Timestamp.fromDate(startTime.toDate()), // Store as a Timestamp
  };
  

  const handleConfirmBooking = async () => {
    setLoading(true); // Start loading
    try {
      const courtRef = doc(FIREBASE_FIRESTORE, 'courts', courtId.toString());
      await updateDoc(courtRef, {
        Bookings: arrayUnion(bookingData) // Add booking data to the Bookings array
      });
      Alert.alert('Success', 'Booking confirmed successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Reservations') } // Navigate to Reservations on OK
      ]);
    } catch (error) {
      console.error("Error updating document: ", error);
      Alert.alert('Error', 'Failed to confirm booking. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.outerContainer}>
        <ScrollView contentContainerStyle={styles.detailsContainer}>
          <Text style={styles.title}>Booking Confirmation</Text>

          <View style={styles.courtInfoContainer}>
            <Text style={styles.courtTitle}>{court.name}</Text>
            <Text style={styles.courtDetails}>{`Court: ${courtType}`}</Text> 
          </View>

          <Text style={styles.date}>{formattedDate}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{`${startTime.format('HH:mm')}`}</Text>
            <MaterialIcons name="arrow-forward-ios" size={20} color="black" style={styles.arrowIcon} />
            <Text style={styles.time}>
              {`${endTime.format('HH:mm')} `}
              <Text style={styles.durationText}>({`${totalDurationInHours.toFixed(1)}h`})</Text>
            </Text>
          </View>

          <View style={styles.numberPicker}>
            <TouchableOpacity
              onPress={() => setNumPeople(prev => Math.max(prev - 1, 1))}
              style={styles.button}
            >
              <MaterialIcons name="remove" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.numberText}>
              {numPeople} {numPeople === 1 ? 'Person' : 'People'}
            </Text>
            <TouchableOpacity
              onPress={() => setNumPeople(prev => prev + 1)}
              style={styles.button}
            >
              <MaterialIcons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.checkboxContainer} 
            onPress={() => setEquipmentNeeded(prev => !prev)}
          >
            <MaterialIcons name={equipmentNeeded ? "check-box" : "check-box-outline-blank"} size={24} />
            <Text style={styles.checkboxText}>Equipment Needed</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.equipmentInput}
            placeholder="Further notes"
            multiline
            numberOfLines={4}
            value={additionalNotes}
            onChangeText={setAdditionalNotes} // Update state with the input
          />

          <View style={styles.separator} />

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Cost:</Text>
            <Text style={styles.totalPrice}>${totalCost.toFixed(2)}</Text>
          </View>
        </ScrollView>

        {loading ? ( // Show loading indicator if loading
          <ActivityIndicator size="large" color="#007BFF" style={styles.loadingIndicator} />
        ) : (
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  outerContainer: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  courtInfoContainer: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  courtTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  courtDetails: {
    fontSize: 16,
    color: 'gray',
  },
  date: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'gray',
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  time: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007BFF',
  },
  durationText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black', // Change this color as needed
  },
  arrowIcon: {
    marginHorizontal: 5,
  },
  numberPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  numberText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxText: {
    fontSize: 18,
    marginLeft: 8,
  },
  equipmentInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 100,
    marginVertical: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    borderStyle: 'dotted',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  confirmButton: {
    backgroundColor: 'rgba(0, 123, 255, 0.9)',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    margin: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});

export default CheckoutScreen;
