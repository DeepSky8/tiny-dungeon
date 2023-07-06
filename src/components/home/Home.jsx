import React, {
    useEffect,
    useReducer,
    useState
} from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../../api/firebase";
import { defaultUserState, userReducer } from "../../reducers/userReducer";
import { clearUser, loadUser } from "../../actions/userActions";
import { startNewCharKey, startUpdateCharID } from "../../actions/charActions";

const Home = () => {
    const [sessions, setSessions] = useState([])
    const [user, dispatchUser] = useReducer(userReducer, defaultUserState)

    // useEffect(() => {
    //     console.log('user', user)
    // }, [user])

    useEffect(() => {
        console.log('sessions', sessions)
    }, [sessions])

    // useEffect(() => {
    //     console.log('auth', auth.currentUser)
    // }, [auth.currentUser])

    useEffect(() => {
        // if (auth.currentUser.uid) {
        onValue(ref(db, `users/${auth.currentUser.uid}`), snapshot => {
            if (snapshot.exists()) {
                dispatchUser(loadUser(snapshot.val()))

                // if(!snapshot.val().currentCharID){

                //         startNewCharKey().then((newKey) => {
                //             startUpdateCharID({ uid: auth.currentUser.uid, currentCharID: newKey })
                //             // updateIDs({ uid: auth.currentUser.uid, charID: newKey })
                //         })

                // }
            }
            // else {
            //     dispatchUser(clearUser())
            // }
        })
        // }

        return (() => {
            // if (auth.currentUser.uid) {
            off(ref(db, `users/${auth.currentUser.uid}`))
            // }
        })
    }, [auth.currentUser.uid])

    useEffect(() => {
        onValue(ref(db, 'sessions'), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => tempArray.push(snap.val()))
            }
            setSessions(tempArray)
        })


        return (() => {
            off(ref(db, 'sessions'))
        })
    }, [])


    // useEffect(() => {
    //     onValue(ref(db, 'authCodes'), snapshot => {
    //         const tempArray = []
    //         if (snapshot.exists()) {
    //             snapshot.forEach(snap => { tempArray.push(snap.val()) })
    //         }
    //         setSessions(tempArray)
    //     })


    //     return (() => {
    //         off(ref(db, 'authCodes'))
    //     })
    // }, [])

    // useEffect(() => {
    //     onValue(ref(db, 'adminCodes'), snapshot => {
    //         const tempArray = []
    //         if (snapshot.exists()) {
    //             snapshot.forEach(snap => { tempArray.push(snap.val()) })
    //         }
    //         setAdminCodes(tempArray)
    //     })


    //     return (() => {
    //         off(ref(db, 'adminCodes'))
    //     })
    // }, [])



    // useEffect(() => {
    //     onValue(ref(db, 'registerLock'), snapshot => {
    //         if (snapshot.exists()) {
    //             setRegisterLock(snapshot.val())
    //         } else {
    //             setRegisterLock(true)
    //         }
    //     })

    //     return (() => {
    //         off(ref(db, 'registerLock'))
    //     })
    // }, [])

    // useEffect(() => {
    //     console.log('registerLock', registerLock)
    // }, [registerLock])



    return (
        <div className="home__container">
            <Header />
            <div className="home__spacer--desktop">
                <Outlet context={[{ user, sessions: sessions }]} />
            </div>
        </div>
    )
}

export default Home