// Import the functions you need from the SDKs you need
import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhvzXmCHETyQcKf9Q4Y9AWc3u4ROjvMus",
  authDomain: "anime-list-react.firebaseapp.com",
  projectId: "anime-list-react",
  storageBucket: "anime-list-react.appspot.com",
  messagingSenderId: "960021079534",
  appId: "1:960021079534:web:d07699261ff82ea4ba9aff"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    db,
    googleAuthProvider,
    firebase
}