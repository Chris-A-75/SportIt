import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, StatusBar, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

const BookingScreen = ({ route }) => {
  const { court } = route.params;
  const [selectedCourtType, setSelectedCourtType] = useState(court.courtTypes[0]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('DD MMM'));
  const [modalVisible, setModalVisible] = useState(false);

  const handleChooseTime = () => {
    setModalVisible(true);
  };

  const getNextWeekDates = () => {
    const dates = [];
    for (let i = 0; i <= 7; i++) {
      dates.push(moment().add(i, 'days').format('DD MMM'));
    }
    return dates;
  };

  const getTimeSlots = () => {
    const slots = [];
    const openTime = moment(court.openFrom, 'HH:mm');
    const closeTime = moment(court.openTo, 'HH:mm').subtract(30, 'minutes'); // Subtract half an hour
  
    while (openTime.isBefore(closeTime) || openTime.isSame(closeTime)) {
      slots.push(openTime.format('HH:mm'));
      openTime.add(30, 'minutes');
    }
  
    return slots;
  };  

  const formatCloseTime = (time) => {
    const hours = Math.floor(time);
    const minutes = (time % 1) * 60;
    return moment(`${hours}:${minutes}`, 'HH:mm').format('HH:mm');
  };

  const dates = getNextWeekDates();
  const timeSlots = getTimeSlots();

  const handleBook = () => {
    // Sort selected times based on their index in timeSlots
    if (selectedTimes.length < 1) {
      Alert.alert("Booking Error", "Please select at least 1 time slot.");
      return;
    }
    const sortedIndices = selectedTimes
      .map(time => timeSlots.indexOf(time))
      .sort((a, b) => a - b);
  
    // Check if sorted indices are consecutive
    const isConsecutive = sortedIndices.every((index, i) => i === 0 || index === sortedIndices[i - 1] + 1);
  
    if (selectedTimes.length < 1 || selectedTimes.length > 4 || !isConsecutive) {
      console.log(selectedTimes.length + " " + isConsecutive);
      Alert.alert("Booking Error", "Please select consecutive time slots.");
      return;
    }
  
    const randomAlertMessages = [
      "Booking successful!",
      "Your reservation is confirmed!",
      "Enjoy your game!",
      "Booking has been made!",
      "You are all set for your match!"
    ];
    const randomMessage = randomAlertMessages[Math.floor(Math.random() * randomAlertMessages.length)];
    Alert.alert("Booking Status", randomMessage);
  };
  

  const calculateTotalTime = (selectedTimes) => {
    // Each selected time slot represents 0.5 hours
    return selectedTimes.length * 0.5; // Return total time in hours
  };
  
const handleDateSelection = (date) => {
  setSelectedDate(date);
  setSelectedTimes([]); // Reset selected times when date changes
};

const getBookedTimeSlots = () => {
  const bookedSlots = [];
  const halfHourDuration = 30; // minutes
  const selectedDateFormatted = moment(selectedDate, 'DD MMM').startOf('day');

  court.Bookings.forEach(booking => {
    const bookingCourtType = booking.CourtType; 

    // Convert Firestore timestamp to a JavaScript Date
    const { seconds, nanoseconds } = booking.Time;
    const bookingDate = new Date(seconds * 1000 + Math.floor(nanoseconds / 1000000));
    
    const bookingTime = moment(bookingDate);
    const bookingDateFormatted = bookingTime.startOf('day');
    const bookingTimeUTC = moment(bookingDate).utcOffset(3);
    console.log('Checking booking:', {
        bookingCourtType,
        selectedCourtType,
        bookingDateFormatted: bookingDateFormatted.format('DD MMM'),
        selectedDate: selectedDateFormatted.format('DD MMM'),
        bookingTime: bookingTimeUTC.format('HH:mm'), // Log the booking time
    });

    if (bookingCourtType === selectedCourtType && bookingDateFormatted.isSame(selectedDateFormatted)) {
      const duration = booking.DurationInHalfHours * halfHourDuration; // Duration in minutes
      const bookingEnd = bookingTimeUTC.clone().add(duration, 'minutes'); // End time based on duration
      let current = bookingTimeUTC.clone(); // Starting point for time slots
      
  
      while (current.isBefore(bookingEnd)) {
          bookedSlots.push(current.format('HH:mm')); // Format to HH:mm for output
          console.log('Adding Time Slot:', current.format('HH:mm')); // Log each added time slot
          current.add(30, 'minutes'); // Increment current time by 30 minutes
      }
  }
  
});


  return bookedSlots;
};





const bookedTimeSlots = useMemo(() => {
  const slots = getBookedTimeSlots();
  console.log('Booked time slots:', slots); // Add this line
  return slots;
}, [court.Bookings, selectedCourtType, selectedDate]);



  const toggleTimeSelection = (time) => {
    const isSelected = selectedTimes.includes(time);
    const isBooked = bookedTimeSlots.includes(time);
  
    if (isBooked) {
      Alert.alert("Unavailable", "This time slot is already booked.");
      return;
    }
  
    if (isSelected) {
      // Deselecting the time
      const updatedTimes = selectedTimes.filter(t => t !== time);
      setSelectedTimes(updatedTimes);
    } else {
      // Selecting a new time
      if (selectedTimes.length < 4) { // Maximum of 4 selections
        setSelectedTimes(prevTimes => [...prevTimes, time]);
      } else {
        Alert.alert("Selection Error", "You can only select a maximum of 4 time slots.");
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: court.courtPictureLink }} style={styles.image} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{court.name}</Text>
            <Text style={styles.price}>${court.pricePerPersonDollar}/hour</Text>
          </View>
          <Text style={styles.location}>{court.mainDisplayLocation}</Text>
          <View style={styles.separator} /> 

          <Text style={styles.infoLabel}>Open From:</Text>
          <Text style={styles.infoText}>{formatCloseTime(court.openFrom)}</Text>
          <Text style={styles.infoLabel}>Open To:</Text>
          <Text style={styles.infoText}>{formatCloseTime(court.openTo)}</Text>
          <Text style={styles.infoLabel}>Parking Available:</Text>
          <Text style={styles.infoText}>{court.hasParkingSpace ? "Yes" : "No"}</Text>
          <Text style={styles.infoLabel}>Indoor/Outdoor:</Text>
          <Text style={styles.infoText}>{court.indoorsOrOutdoors}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.chooseTimeButton} onPress={handleChooseTime}>
        <Text style={styles.chooseTimeButtonText}>Choose Time to Book</Text>
      </TouchableOpacity>

      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.5)" />
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalText}>Select a Time</Text>
        <TouchableOpacity 
          style={styles.closeXButton} 
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.closeXText}>×</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Court Type:</Text>
        <Picker
    selectedValue={selectedCourtType}
    style={styles.picker}
    onValueChange={(itemValue) => {
        setSelectedCourtType(itemValue);
        setSelectedTimes([]); // Reset selected times when court type changes
    }}
>
    {court.courtTypes.map((type, index) => (
        <Picker.Item key={index} label={type} value={type} />
    ))}
</Picker>

      </View>

      <View style={styles.timeGrid}>
    {timeSlots.map((time, index) => {
        const isBooked = bookedTimeSlots.includes(time);
        return (
            <TouchableOpacity 
                key={index} 
                style={[
                    styles.timeButton, 
                    selectedTimes.includes(time) && styles.selectedTimeButton, 
                    isBooked && styles.bookedTimeButton
                ]}
                onPress={() => toggleTimeSelection(time)}
                disabled={isBooked}
            >
                <Text style={[
                    styles.timeButtonText, 
                    selectedTimes.includes(time) ? styles.selectedText : styles.defaultText,
                    isBooked && styles.bookedText
                ]}>
                    {time}
                </Text>
            </TouchableOpacity>
        );
    })}
</View>

      <View style={styles.totalTimeContainer}>
  <Text style={styles.totalTimeText}>
    Total Time: {calculateTotalTime(selectedTimes)} hour(s)
  </Text>
</View>
      <View style={styles.separator} />

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.dateScrollView}>
        {dates.map((date, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.dateButton, selectedDate === date && styles.selectedDateButton]} 
            onPress={() => handleDateSelection(date)}
          >
            <Text style={[styles.dateButtonText, selectedDate === date ? styles.selectedText : styles.defaultText]}>{date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.bookButton} 
        onPress={handleBook}
      >
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

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
    paddingBottom: 100,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
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
    //marginVertical: 15,
    width: '100%',
  },
  dropdownLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
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
    backgroundColor: 'rgba(0, 123, 255, 0.8)',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  chooseTimeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10, // Added padding
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  timeButton: {
    backgroundColor: '#f0f0f0', // Updated to #f0f0f0 for unselected
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
    width: '18%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalTimeContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  totalTimeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },  
  selectedTimeButton: {
    backgroundColor: 'rgb(0,123,255)', // Blue color when selected
  },
  timeButtonText: {
    fontSize: 16,
  },
  selectedText: {
    color: 'white', // Selected text color
  },
  defaultText: {
    color: 'black', // Default text color
  },
  dateScrollView: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: '#f0f0f0', // Updated to #f0f0f0 for unselected
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDateButton: {
    backgroundColor: 'rgb(0,123,255)', // Blue color when selected
  },
  dateButtonText: {
    fontSize: 18,
  },
  closeXButton: {
    backgroundColor: 'transparent',
    padding: 5,
  },
  closeXText: {
    fontSize: 28,
    color: 'rgb(0,123,255)', // Changed to blue
  },
  bookButton: {
    backgroundColor: 'rgba(0, 123, 255, 0.8)', // Updated button color and opacity
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
  },
  bookedTimeButton: {
    backgroundColor: 'red', // Color for booked time buttons
  },
  bookedText: {
    color: 'white', // Text color for booked time buttons
  },
});

export default BookingScreen;
