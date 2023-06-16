import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";

const Home = () => {
    const [auth, setAuthCodes] = useState([])
    const [admin, setAdminCodes] = useState([])

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

    const codes = {
        auth,
        admin
    }

    return (
        <div className="home__container">
            <Header />
            <Outlet context={[codes]} />
        </div>
    )
}

export default Home