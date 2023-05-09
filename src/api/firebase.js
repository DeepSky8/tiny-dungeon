// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLmK0XBussQqLFL48pLZBlVQ9Qycf7_gw",
    authDomain: "tinydungeon-85b41.firebaseapp.com",
    projectId: "tinydungeon-85b41",
    storageBucket: "tinydungeon-85b41.appspot.com",
    messagingSenderId: "318938211048",
    appId: "1:318938211048:web:8c9eef0216b527c0669f5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {auth, db}