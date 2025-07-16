import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA04kr-qD2-SUbIN2623h7fSXFNv7o_rvQ",
  authDomain: "react-native-users-app.firebaseapp.com",
  projectId: "react-native-users-app",
  storageBucket: "react-native-users-app.firebasestorage.app",
  messagingSenderId: "53980214777",
  appId: "1:53980214777:web:0512598d0b2da0838ff928",
  measurementId: "G-M72FW4FWCR"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

export default app;