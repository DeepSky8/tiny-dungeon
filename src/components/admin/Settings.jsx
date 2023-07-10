import React, { useEffect, useState } from "react";
import Footer from "../home/Footer";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { startClearCharData } from "../../actions/charActions";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";


const Settings = () => {
    let navigate = useNavigate()
    const [sessions, setSessionCodes] = useState([])

    const [, , { removeItem: removeLocalChar }] = useLocalStorageState('localChar')
    const [, , { removeItem: removeLocalFamiliar }] = useLocalStorageState('familiar')
    const [localCode,] = useLocalStorageState('localCode')
    const [localCID,] = useLocalStorageState('localCID')



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


    const clearCharData = () => {
        removeLocalChar()
        removeLocalFamiliar()
        // setLocalChar('')
        // setLocalFamiliar('')
        startClearCharData({ gameCode: localCode, charID: localCID })
        navigate('/')
    }

    return (
        <div>
            <Outlet context={[sessions]} />
            <hr className="hr__brown" />
            <div className="centered brown">
                <Link to={'/admin'}>Admin</Link>
            </div>
            <div className="centered topMargin">
                <button
                    className="authCode__button--submit"
                    onClick={clearCharData}
                >Delete Character Data</button>
            </div>
            <Footer />
        </div>
    )
}

export default Settings