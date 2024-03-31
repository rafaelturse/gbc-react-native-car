import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBV2V0kZ-PuxZoK32bdI1eYeKrkRVQSDDk",
  authDomain: "gbc-react-native.firebaseapp.com",
  projectId: "gbc-react-native",
  storageBucket: "gbc-react-native.appspot.com",
  messagingSenderId: "1744968402",
  appId: "1:1744968402:web:feaeeb5431eeea87d32b0b",
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }