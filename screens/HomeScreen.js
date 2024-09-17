import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library
import CourtList from '../Components/CourtList';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CourtList />
      <TouchableOpacity style={styles.floatingButton} onPress={() => alert('Book a court')}>
        <Icon name="calendar-today" size={18} color="white" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Book a court</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 15,
    right: 5,
    backgroundColor: '#007BFF', // Button color
    paddingVertical: 20, // Reduced height
    paddingHorizontal: 25, // Reduced width
    borderRadius: 10, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // For Android shadow effect
    alignItems: 'center', // Center contents horizontally
    flexDirection: 'row', // Align icon and text in a row
    justifyContent: 'center', // Center contents vertically
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14, // Adjusted font size
    marginLeft: 8, // Space between icon and text
  },
  buttonIcon: {
    marginRight: 8, // Space between icon and text
  },
});
