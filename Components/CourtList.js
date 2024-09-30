import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FIREBASE_FIRESTORE } from '../firebaseConfig'; // Adjusted path as needed
import { collection, getDocs } from 'firebase/firestore';

const { width } = Dimensions.get('window');

const CourtList = ({ navigation }) => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const courtsCollection = collection(FIREBASE_FIRESTORE, 'courts');
        const courtsSnapshot = await getDocs(courtsCollection);

        const courtsData = courtsSnapshot.docs.map(doc => ({
          id: doc.id,
          Bookings: doc.data().Bookings,
          courtPictureLink: doc.data().courtPictureLink,
          courtTypes: doc.data().courtTypes,
          geolocation: doc.data().geolocation,
          hasParkingSpace: doc.data().hasParkingSpace,
          indoorsOrOutdoors: doc.data().indoorsOrOutdoors,
          mainDisplayLocation: doc.data().mainDisplayLocation,
          name: doc.data().name,
          openFrom: doc.data().openFrom,
          openTo: doc.data().openTo,
          phoneNumber: doc.data().phoneNumber,
          pricePerOnePersonHalfHour: doc.data().pricePerOnePersonHalfHour,
          Tags: doc.data().Tags, // Add the tags
        }));

        console.log("Fetched courts data:", courtsData);
        setCourts(courtsData);
      } catch (error) {
        console.error("Error fetching court data: ", error);
      } finally {
        setLoading(false); // Stop loading after fetch is complete
      }
    };

    fetchCourts();
  }, []);

  const renderCourt = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Booking', { court: item })}
    >
      <Image source={{ uri: item.courtPictureLink }} style={styles.image} />
      <View style={styles.textContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
        <View style={styles.tagsContainer}>
          {item.Tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
      </View>
      <Text style={styles.subText}>{item.mainDisplayLocation}</Text>
      <Text style={styles.price}>${item.pricePerOnePersonHalfHour}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ); // Show loading indicator while data is being fetched
  }

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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    width: width * 0.9, // Set a fixed width for the card
    alignSelf: 'center', // Center the card horizontally
  },
  image: {
    width: '100%',
    height: width * 0.5,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  textContainer: {
    width: '100%',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Align items vertically
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '100%', // Allow the tags to take full width
    justifyContent: 'flex-start', // Align tags to the left
    marginTop: 5, // Add some space above tags
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    paddingVertical: 3, // Smaller vertical padding
    paddingHorizontal: 8, // Smaller horizontal padding
    margin: 2, // Space between tags
    fontSize: 12, // Smaller font size
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 17,
    color: '#353635',
    marginTop: 5,
    alignSelf: 'flex-start', // Align to the left
  },
  flatListContainer: {
    paddingBottom: 20,
  },
});

export default CourtList;
