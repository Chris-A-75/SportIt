import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { FIREBASE_AUTH } from '../firebaseConfig';

const  ProfileScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title='Log out' />
    </View>
  );
}

export default ProfileScreen;