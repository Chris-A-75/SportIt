import { View, FlatList, Text, StyleSheet, Image } from 'react-native';

const courts = [
  { id: '1', name: 'Court 1', image: 'https://archive.org/download/placeholder-image/placeholder-image.jpg' },
  { id: '2', name: 'Court 2', image: 'https://archive.org/download/placeholder-image/placeholder-image.jpg' },
  { id: '3', name: 'Court 3', image: 'https://archive.org/download/placeholder-image/placeholder-image.jpg' },
  { id: '4', name: 'Court 4', image: 'https://archive.org/download/placeholder-image/placeholder-image.jpg' },
  { id: '5', name: 'Court 5', image: 'https://archive.org/download/placeholder-image/placeholder-image.jpg' },
  { id: '6', name: 'Court 6', image: 'https://archive.org/download/placeholder-image/placeholder-image.jpg' },
  { id: '7', name: 'Court 7', image: 'https://archive.org/download/placeholder-image/placeholder-image.jpg' },
  // Add more court objects here
];

const CourtList = () => {
  // Render an image and text for each court
  const renderCourt = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
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
    paddingHorizontal: 100,
    margin: 10,
    borderRadius: 10, // Rounded corners
    alignItems: 'center', // Center contents horizontally
  },
  image: {
    width: 100, // Set a width for the image
    height: 100, // Set a height for the image
    borderRadius: 10, // Rounded edges for the image
    marginBottom: 10, // Space between image and text
  },
  text: {
    fontSize: 18,
  },
});

export default CourtList;