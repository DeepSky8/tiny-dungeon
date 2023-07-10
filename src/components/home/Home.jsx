import React, {
    useEffect,
    useReducer,
    useState
} from "react";
import useLocalStorageState from "use-local-storage-state";
import Header from "./Header";
import { Outlet } from "react-router";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../../api/firebase";
import { defaultUserState, userReducer } from "../../reducers/userReducer";
import { startNewCharKey } from "../../actions/charActions";
import { defaultChar } from "../../reducers/charReducer";
import { onAuthStateChanged } from "firebase/auth";
import { startCreateUser } from "../../actions/userActions";

const Home = () => {
    const [localUser, setLocalUser, { removeItem: removeLocalUser }] = useLocalStorageState('localUser', { defaultValue: defaultUserState })
    const [sessionCodes, setSessionCodes] = useState([])

    useEffect(() => {
        return (() => {
            if (localUser.email !== 'none provided') {
                removeLocalUser()
            }
        })
    }, [])

    useEffect(() => {
        onValue(ref(db, 'sessions'), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => { tempArray.push(snap.val()) })
            }
            setSessionCodes(tempArray)
        })


        return (() => {
            off(ref(db, 'sessions'))
        })
    }, [])

    // const [localCID, setLocalCID,] = useLocalStorageState('localCID', { defaultValue: '' })
    // const [localChar, setLocalChar] = useLocalStorageState('localChar', { defaultValue: defaultChar })
    // const [sessions, setSessionCodes] = useState([])
    // const [admin, setAdminCodes] = useState([])
    // const [charIDs, setCharIDs] = useState([])
    // const [registerLock, setRegisterLock] = useState(false)
    // const [user, dispatchUser] = useReducer(userReducer, defaultUserState)

    // useEffect(() => {
    //     if (auth.currentUser) {

    //         onValue(ref(db, `${auth.currentUser.uid}/charIDs`), snapshot => {
    //             const tempArray = []
    //             if (snapshot.exists()) {
    //                 snapshot.forEach(snap => tempArray.push(snap.val()))
    //             }
    //             setCharIDs(tempArray)
    //         })
    //     } else if (localCID) {

    //     }
    //     if (auth.currentUser) {
    //         return (() => {
    //             off(ref(db, `${auth.currentUser.uid}/charIDs`))
    //         })
    //     }
    // }, [])

    // useEffect(() => {
    //     onValue(ref(db, 'authCodes'), snapshot => {
    //         const tempArray = []
    //         if (snapshot.exists()) {
    //             snapshot.forEach(snap => tempArray.push(snap.val()))
    //         }
    //         setAuthCodes(tempArray)
    //     })


    //     return (() => {
    //         off(ref(db, 'authCodes'))
    //     })
    // }, [])

    // useEffect(() => {
    //     if (localCID === '') {
    //         startNewCharKey().then((newKey) => {
    //             setLocalCID(newKey)
    //         })
    //     }
    // }, [])


    // useEffect(() => {
    //     onValue(ref(db, 'sessions'), snapshot => {
    //         const tempArray = []
    //         if (snapshot.exists()) {
    //             snapshot.forEach(snap => { tempArray.push(snap.val()) })
    //         }
    //         setSessionCodes(tempArray)
    //     })


    //     return (() => {
    //         off(ref(db, 'sessions'))
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

    // const context = {
    //     sessions,
    //     // admin,
    //     // registerLock,
    //     // localCID
    // }


    // onAuthStateChanged(auth, (user) => {
    //     console.log('auth state changed', user)
    //     if (user && user.isAnonymous) {
    //         startCreateUser({ uid: auth.currentUser.uid, authProvider: 'anonymous' })
    //     }
    // })

    // useEffect(() => {
    //     console.log('firing user listener',)
    //     if (auth.currentUser) {
    //         onValue(ref(db, `/users/${auth.currentUser.uid}`), snapshot => {
    //             if (snapshot.exists()) {
    //                 setLocalUser(snapshot.val())
    //             }
    //         })
    //     }

    //     return (() => {
    //         if (auth.currentUser) {
    //             off(ref(db, `users/${auth.currentUser.uid}`))
    //         }
    //         removeLocalUser()
    //     })
    // }, [auth.lastNotifiedUid])


    return (
        <div className="home__container">
            <Header />
            <div className="home__spacer--desktop">
                <Outlet context={[sessionCodes]} />
            </div>
        </div>
    )
}

export default Home