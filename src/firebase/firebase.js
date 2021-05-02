import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDeB_Jh5HiaYQcf-VBFsOSXwRdNYpnLH1k",
    authDomain: "movies-mani.firebaseapp.com",
    projectId: "movies-mani",
    storageBucket: "movies-mani.appspot.com",
    messagingSenderId: "914318834939",
    appId: "1:914318834939:web:e291f57464631c15a7845e",
    measurementId: "G-MNED6119GT"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;