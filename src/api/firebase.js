// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { startCreateUser, startUpdateUserAccessDate } from "../actions/authActions";
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
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider)
            .then((result) => {
                startCreateUser(
                    {
                        uid: result.user.uid,
                        authProvider: 'Google',
                        email: result.user.email,
                    }
                )
                // split('@')[0].toUpperCase()
                return result.user.uid
            })
            .then((uid) => {
                startUpdateUserAccessDate({ uid })
            })
            .catch((error) => {
                alert(error)
            })
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                if (result) {
                    startUpdateUserAccessDate({ uid: result.user.uid })
                }
            })
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (email, password) => {
    try {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {

                startCreateUser({
                    uid: result.user.uid,
                    authProvider: 'local',
                    email: email,
                    // .split('@')[0].toUpperCase()
                })

            })
            .catch((err) => {
                console.error(err);
                alert(err.message);
            })
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    await sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset link sent!");
        })
        .catch((error) => {
            alert(error.message)
        })
};

const logout = () => {
    signOut(auth);
};


export {
    auth,
    db,
    logInWithEmailAndPassword,
    logout,
    registerWithEmailAndPassword,
    sendPasswordReset,
    signInWithGoogle,

}