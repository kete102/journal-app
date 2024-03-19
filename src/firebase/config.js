// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAGZkwQmutxxtg5nbM5-oQEmx-RlRzZg_U',
  authDomain: 'journal-app-a30a8.firebaseapp.com',
  projectId: 'journal-app-a30a8',
  storageBucket: 'journal-app-a30a8.appspot.com',
  messagingSenderId: '72670585708',
  appId: '1:72670585708:web:4e26cf501280d23fad8949'
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)
