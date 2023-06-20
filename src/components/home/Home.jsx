import React, {
    useEffect,
    // useReducer, 
    useState
} from "react";
import useLocalStorageState from "use-local-storage-state";
import Header from "./Header";
import { Outlet } from "react-router";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";
// import { defaultUserState, userReducer } from "../../reducers/userReducer";
import { startNewCharKey } from "../../actions/charActions";

const Home = () => {
    const [localCID, setLocalCID] = useLocalStorageState('localCID', { defaultValue: '' })
    const [auth, setAuthCodes] = useState([])
    const [admin, setAdminCodes] = useState([])
    // const [charIDs, setCharIDs] = useState([])
    const [registerLock, setRegisterLock] = useState(false)
    // const [currentUser, dispatchCurrentUser] = useReducer(userReducer, defaultUserState)

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

    useEffect(() => {
        if (localCID === '') {
            startNewCharKey().then((newKey) => {
                setLocalCID(newKey)
            })
        }
    }, [])


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
        auth,
        admin,
        registerLock,
        localCID
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