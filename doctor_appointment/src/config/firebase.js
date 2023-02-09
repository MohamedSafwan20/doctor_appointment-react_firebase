import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD91BdET1f_t1swV0QbUWxV7A86Z6T3XNg",
  authDomain: "practise-2d1ad.firebaseapp.com",
  projectId: "practise-2d1ad",
  storageBucket: "practise-2d1ad.appspot.com",
  messagingSenderId: "580858538532",
  appId: "1:580858538532:web:acf044b8a06af1ea3886b1",
  measurementId: "G-QY5XQKBZYR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
