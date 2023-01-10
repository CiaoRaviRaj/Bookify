
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBgQTYz0pHCVQjozI3PV3e3YilQss-OCBQ',
  authDomain: 'bookify-9bc4d.firebaseapp.com',
  projectId: 'bookify-9bc4d',
  storageBucket: 'bookify-9bc4d.appspot.com',
  messagingSenderId: '679386773594',
  appId: '1:679386773594:web:e1c11174debb0d3263c063',
}

// const app = !firebase.apps.length
//   ? initializeApp(firebaseConfig)
//   : firebase.app()
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
