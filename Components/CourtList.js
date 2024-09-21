import React from 'react';
import { View, FlatList, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

// Updated courts array with PricePerPersonDollar
const courts = [
  {
    id: '1',
    name: 'Court 1',
    Location: 'Achrafieh, Lebanon',
    image: 'https://lh3.googleusercontent.com/p/AF1QipPrry0EuTdOJvyiLmacwXfFK5y6yhjGbemXMLRg=s680-w680-h510',
    PricePerPersonDollar: 15,
    courtTypes: ['Padel Court 1', 'Basketball Court 1'],
  },
  {
    id: '2',
    name: 'Court 2',
    Location: 'Achrafieh, Lebanon',
    image: 'https://lh3.googleusercontent.com/p/AF1QipPrry0EuTdOJvyiLmacwXfFK5y6yhjGbemXMLRg=s680-w680-h510',
    PricePerPersonDollar: 20,
    courtTypes: ['Tennis Court 1', 'Football Field 1'],
  },
  {
    id: '3',
    name: 'Court 3',
    Location: 'Achrafieh, Lebanon',
    image: 'https://lh3.googleusercontent.com/p/AF1QipPrry0EuTdOJvyiLmacwXfFK5y6yhjGbemXMLRg=s680-w680-h510',
    PricePerPersonDollar: 18,
    courtTypes: ['Basketball Court 2', 'Padel Court 2'],
  },
  // Add more courts as needed
];


const CourtList = ({ navigation }) => {
  const renderCourt = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Booking', { court: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.subText}>{item.Location}</Text>
        </View>
        <Text style={styles.price}>${item.PricePerPersonDollar}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={courts}
        renderItem={renderCourt}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  image: {
    width: width * 0.75,
    height: width * 0.5,
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-between', // Space between items
    width: '100%', // Full width for the container
  },
  infoContainer: {
    flex: 1, // Allow this to take remaining space
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50', // Use a green color for the price
    alignSelf: 'flex-end', // Align price to the right
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 17,
    color: '#353635',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
});

export default CourtList;
