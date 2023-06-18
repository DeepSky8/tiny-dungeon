import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";

const Home = () => {
    const [auth, setAuthCodes] = useState([])
    const [admin, setAdminCodes] = useState([])
    const [registerLock, setRegisterLock] = useState(false)

    useEffect(() => {
        onValue(ref(db, 'authCodes'), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => tempArray.push(snap.val()))
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
                snapshot.forEach(snap => tempArray.push(snap.val()))
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

    const codes = {
        auth,
        admin,
        registerLock
    }

    return (
        <div className="home__container">
            <div className="home__contents">
                <Header />
                <Outlet context={[codes]} />
            </div>
        </div>
    )
}

export default Home