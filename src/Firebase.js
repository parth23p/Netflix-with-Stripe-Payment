// import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDWIbkYmXBiLpgOq1FrGK4chEtWhd8LZwI",
  authDomain: "netflix-build-f46c6.firebaseapp.com",
  projectId: "netflix-build-f46c6",
  storageBucket: "netflix-build-f46c6.appspot.com",
  messagingSenderId: "905773631736",
  appId: "1:905773631736:web:bc0f3f70fa28d49962530d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { auth };
export default db;
