import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CheckoutScreen = ({ route }) => {
  const { selectedDate, selectedTimes, court, courtType } = route.params; // Accessing courtType
  const [numPeople, setNumPeople] = useState(1);
  const [equipmentNeeded, setEquipmentNeeded] = useState(false);
  
  // Calculate total cost based on number of people and selected times
  const costPerPerson = court.pricePerOnePersonHalfHour; // Assuming this is the cost for half an hour
  const totalCost = numPeople * (selectedTimes.length * costPerPerson);
  
  // Format date and times for display
  const formattedDate = moment(selectedDate, 'DD MMM').format('dddd, MMMM Do YYYY');
  const formattedTimes = `${selectedTimes[0]}  `;

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
            <Text style={styles.time}>{formattedTimes}</Text>
            <MaterialIcons name="arrow-forward-ios" size={20} color="black" style={styles.arrowIcon} />
            <Text style={styles.time}>{` ${selectedTimes[selectedTimes.length - 1]}`}</Text>
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
          />

          <View style={styles.separator} />

          
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Cost:</Text>
            <Text style={styles.totalPrice}>${totalCost.toFixed(2)}</Text>
          </View>
        </ScrollView>

        
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
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
});

export default CheckoutScreen;
