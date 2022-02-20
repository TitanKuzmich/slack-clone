import firebase from 'firebase/compat'

const firebaseConfig = {
    apiKey: "AIzaSyCM83eHR1ylAVoxa5hNxPUwR6jNWjoWKQI",
    authDomain: "slack-5be14.firebaseapp.com",
    projectId: "slack-5be14",
    storageBucket: "slack-5be14.appspot.com",
    messagingSenderId: "2053679108",
    appId: "1:2053679108:web:1a711c8f242360aeb7ad51"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, db, provider}