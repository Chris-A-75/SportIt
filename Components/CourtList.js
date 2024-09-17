import { View, FlatList, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const courts = [
  { id: '1', name: 'Court 1', Location: 'Achrafieh, Lebanon', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '3', name: 'Court 3', Location: 'Achrafieh, Lebanon', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '4', name: 'Court 4', Location: 'Achrafieh, Lebanon', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '5', name: 'Court 5', Location: 'Achrafieh, Lebanon', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '6', name: 'Court 6', Location: 'Achrafieh, Lebanon', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '7', name: 'Court 7', Location: 'Achrafieh, Lebanon', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  // Add more court objects here
];

const CourtList = () => {
  // Render an image and text for each court
  const renderCourt = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.subText}>{item.Location}</Text>
    </View>
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
  },
  image: {
    width: width * 0.75, // Take up 60% of the screen width
    height: width * 0.5, // Height is 40% of the screen width to maintain landscape format
    borderRadius: 10, // Rounded edges for the image
    marginBottom: 10, // Space between image and text
},
  text: {
    fontSize: 20,
    flexWrap: 'wrap',
  },
  subText: {
    fontSize: 17,
    color: '#353635',
    flexWrap: 'wrap',
  }
});

export default CourtList;