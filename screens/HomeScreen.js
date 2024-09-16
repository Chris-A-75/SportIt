import * as React from 'react';
import { View, Text } from 'react-native';
import CourtList from '../Components/CourtList';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'} }>
      <CourtList />
    </View>
  );
}