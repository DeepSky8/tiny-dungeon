import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";

const Home = () => {
    const [authCodes, setAuthCodes] = useState([])
    
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
    return (
        <div className="home__container">
            <Header />
            <Outlet context={[authCodes]} />
        </div>
    )
}

export default Home