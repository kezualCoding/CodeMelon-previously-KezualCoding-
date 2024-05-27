// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsihBLr7xNNcnylbuOkn_STXt9fWaQAZQ",
  authDomain: "kezualcoding-react.firebaseapp.com",
  projectId: "kezualcoding-react",
  storageBucket: "kezualcoding-react.appspot.com",
  messagingSenderId: "525883454238",
  appId: "1:525883454238:web:314641f89e8185fddecf0f",
  measurementId: "G-RRC1JW3NYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
