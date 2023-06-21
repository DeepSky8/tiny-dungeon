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
import { startNewCharKey } from "../../actions/charActions";
import { defaultUserState, userReducer } from "../../reducers/userReducer";
import { loadUser } from "../../actions/userActions";

const Home = () => {
    // const [localCID, setLocalCID, { removeItem: clearLocalCID }] = useLocalStorageState('localCID', { defaultValue: '' })
    const [authCodes, setAuthCodes] = useState([])
    const [admin, setAdminCodes] = useState([])
    // const [charIDs, setCharIDs] = useState([])
    // const [registerLock, setRegisterLock] = useState(false)
    // const [user, dispatchUser] = useReducer(userReducer, defaultUserState)

    // useEffect(() => {
    //     console.log('user', user)
    // }, [user])

    // useEffect(() => {
    //     if (auth.currentUser) {

    //         onValue(ref(db, `users/${auth.currentUser.uid}`), snapshot => {
    //             if (snapshot.exists()) {
    //                 dispatchUser(loadUser(snapshot.val()))
    //             }
    //         })
    //     }

    //     return (() => {
    //         off(ref(db, `users/${auth.currentUser.uid}`))
    //     })
    // }, [auth.currentUser])



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


    useEffect(() => {
        onValue(ref(db, 'authCodes'), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => { tempArray.push(snap.val()) })
            }
            setAuthCodes(tempArray)
        })


        return (() => {
            off(ref(db, 'authCodes'))
        })
    }, [])

    useEffect(() => {
        onValue(ref(db, 'adminCodes'), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => { tempArray.push(snap.val()) })
            }
            setAdminCodes(tempArray)
        })


        return (() => {
            off(ref(db, 'adminCodes'))
        })
    }, [])



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

    const context = {
        authCodes,
        admin,
        // registerLock,
        // localCID
    }

    return (
        <div className="home__container">
            <Header />
            <div className="home__spacer--desktop">
                <Outlet context={[context]} />
            </div>
        </div>
    )
}

export default Home