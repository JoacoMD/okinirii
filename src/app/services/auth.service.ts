import firebase from "firebase"
import { googleAuthProvider } from "../../firebase/FirebaseConfig"

export const loginWithGoogleAuth = (callback) => {
    firebase.auth().signInWithPopup( googleAuthProvider )
        .then(callback)
        .catch(console.error)
}