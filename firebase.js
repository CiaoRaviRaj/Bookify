// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBgQTYz0pHCVQjozI3PV3e3YilQss-OCBQ',
  authDomain: 'bookify-9bc4d.firebaseapp.com',
  projectId: 'bookify-9bc4d',
  storageBucket: 'bookify-9bc4d.appspot.com',
  messagingSenderId: '679386773594',
  appId: '1:679386773594:web:e1c11174debb0d3263c063',
}
console.log(getApps().length)
// Initialize Firebase
// const app = initializeApp(firebaseConfig)
!getApps().length && initializeApp(firebaseConfig)

const db = getFirestore()

export default db
