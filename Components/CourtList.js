import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { FIREBASE_FIRESTORE } from '../firebaseConfig'; // Adjusted path as needed
import { collection, getDocs } from 'firebase/firestore';

const { width } = Dimensions.get('window');

const CourtList = ({ navigation }) => {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const courtsCollection = collection(FIREBASE_FIRESTORE, 'courts'); // Reference to the 'courts' collection
        const courtsSnapshot = await getDocs(courtsCollection); // Fetch all documents in the collection

        const courtsData = courtsSnapshot.docs.map(doc => ({
          id: doc.id, // Document ID
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
          pricePerPersonDollar: doc.data().pricePerPersonDollar,
        }));

        console.log("Fetched courts data:", courtsData); // Log the fetched data
        setCourts(courtsData); // Update state with the fetched courts
      } catch (error) {
        console.error("Error fetching court data: ", error);
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
          <Text style={styles.subText}>{item.mainDisplayLocation}</Text>
        </View>
        <Text style={styles.price}>${item.pricePerPersonDollar}</Text>
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
    alignItems: 'center', // Center items in the card
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  image: {
    width: '100%', // Make the image take the full width of the card
    height: width * 0.5, // Set the height proportionally
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover', // Ensure the image covers the area without distortion
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  infoContainer: {
    flex: 1,
  },
  price: {
    fontSize: 18,
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
  },
  flatListContainer: {
    paddingBottom: 20,
  },
});

export default CourtList;
