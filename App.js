//these are packages used for stuff in the app (mostly UI stuff)
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

//these are references to the different pages we'll have
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ReservationsScreen from './screens/ReservationsScreen';


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'Reservations') {
            iconName = 'event';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: styles.tabBar.activeTintColor,
        tabBarInactiveTintColor: styles.tabBar.inactiveTintColor,
        tabBarStyle: styles.tabBar.style,
        tabBarLabelStyle: styles.tabBar.labelStyle,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Reservations" component={ReservationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    style: {
      backgroundColor: '#fff', // background color of the tab bar
      height: 60, // height of the tab bar
      borderTopWidth: 0, // remove top border
      paddingBottom: 5, // padding at the bottom
    },
    labelStyle: {
      fontSize: 12,
    },
  },
});
