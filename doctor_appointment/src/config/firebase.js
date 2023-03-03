import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0tzkUUjm7YYk4ppfeDHCfR85tIz05Mdo",
  authDomain: "doctor-appointment-e9682.firebaseapp.com",
  projectId: "doctor-appointment-e9682",
  storageBucket: "doctor-appointment-e9682.appspot.com",
  messagingSenderId: "111923609700",
  appId: "1:111923609700:web:a1bfd7237b3d8d3896df71"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
