import React from 'react';
import { View, FlatList, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';

const { width } = Dimensions.get('window');

const courts = [
  { id: '1', name: 'Court 1', Location: 'Achrafieh, Lebanon', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '2', name: 'Court 2', Location: 'Achrafieh, Lebanon', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '3', name: 'Court 3', Location: 'Achrafieh, Lebanon', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '4', name: 'Court 4', Location: 'Achrafieh, Lebanon', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '5', name: 'Court 5', Location: 'Achrafieh, Lebanon', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '6', name: 'Court 6', Location: 'Achrafieh, Lebanon', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '7', name: 'Court 7', Location: 'Achrafieh, Lebanon', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  // Add more court objects here
];

const CourtList = () => {
  // Handle press event
  const handlePress = (courtName) => {
    Alert.alert('Court Selected', `You selected ${courtName}`);
  };

  // Render an image and text for each court
  const renderCourt = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item.name)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.subText}>{item.Location}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={courts}
        renderItem={renderCourt}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer} // Add padding to the FlatList
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10, // Add padding to the edges of the screen
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    paddingHorizontal: 50,
    margin: 10,
    borderRadius: 10, // Rounded corners
    alignItems: 'center', // Center contents horizontally
    elevation: 3, // Add elevation for Android shadow
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 1, // Shadow radius
  },
  image: {
    width: width * 0.75, // Take up 75% of the screen width
    height: width * 0.5, // Height is 50% of the screen width to maintain landscape format
    borderRadius: 10, // Rounded edges for the image
    marginBottom: 10, // Space between image and text
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
    paddingBottom: 20, // Add padding at the bottom of the FlatList
  },
});

export default CourtList;
