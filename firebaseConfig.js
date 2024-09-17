// Firebase stuff
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'; // Import authentication
import { getAnalytics } from 'firebase/analytics'; // Optional, if you need analytics

const firebaseConfig = {
  apiKey: "AIzaSyChcP-T-BvlRqGIW8LOhDUTg9xObW5l_Ug",
  authDomain: "sportit-8e97c.firebaseapp.com",
  projectId: "sportit-8e97c",
  storageBucket: "sportit-8e97c.appspot.com",
  messagingSenderId: "797209167046",
  appId: "1:797209167046:web:70f0bb193b44c3746083c7",
  measurementId: "G-QF3BF86NPG"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP); // Get the auth instance
export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP); // Optional, if you use analytics

setPersistence(FIREBASE_AUTH, browserLocalPersistence)
  .catch((error) => {
    console.error('Failed to set auth persistence:', error);
  });
