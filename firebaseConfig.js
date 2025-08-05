// Firebase stuff
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'; // Import authentication
import { getFirestore } from "firebase/firestore";
import {
  API_KEY,
  AUTH_DOMAIN,
  MEASUREMENT_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID
} from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP); // Get the auth instance
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);

setPersistence(FIREBASE_AUTH, browserLocalPersistence) //<=== doesnt work :D
  .catch((error) => {
    console.error('Failed to set auth persistence:', error);
  });
