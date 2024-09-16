import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth
import { initializeApp } from "firebase/app";
import { FIREBASE_AUTH, firebaseConfig } from "./firebaseConfig";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ReservationsScreen from "./screens/ReservationsScreen";
import LoginScreen from "./screens/LoginScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); 

// Bottom tab navigator (for Home, Reservations, Profile)
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "person";
          } else if (route.name === "Reservations") {
            iconName = "event";
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

const App = () => {
  const [user, setUser] = useState(null); // This will hold the current authenticated user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user); // Sets the user state when authentication state changes
    });

    return unsubscribe; // Clean up subscription
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // If user is logged in, show the TabNavigator (Home, Reservations, Profile)
          <Stack.Screen
            name="Home"
            component={MyTabs}
            options={{ headerShown: false }}
          />
        ) : (
          // If no user is logged in, show the LoginScreen
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    activeTintColor: "tomato",
    inactiveTintColor: "gray",
    style: {
      backgroundColor: "#fff", // background color of the tab bar
      height: 60, // height of the tab bar
      borderTopWidth: 0, // remove top border
      paddingBottom: 5, // padding at the bottom
    },
    labelStyle: {
      fontSize: 12,
    },
  },
});

export default App;
