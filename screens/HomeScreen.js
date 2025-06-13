// HomeScreen.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // import the icon library
import CourtList from '../Components/CourtList';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CourtList navigation={navigation} /> 
      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={() => alert('Book a court')}
      >
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
    backgroundColor: 'rgba(0, 123, 255, 0.8)', // updated to be slightly transparent
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
});
