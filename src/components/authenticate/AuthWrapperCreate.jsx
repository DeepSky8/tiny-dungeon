import React, { useEffect, useState } from "react";
import { db } from "../../api/firebase";
import { Navigate, Outlet } from "react-router";
import { off, onValue, ref } from "firebase/database";
import useLocalStorageState from "use-local-storage-state";

const AuthWrapperCreate = () => {
    const [localCodeCreate,] = useLocalStorageState('localCodeCreate')
    const [adminCodes, setAdminCodes] = useState([])

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

    if (localCodeCreate !== undefined && adminCodes.includes(localCodeCreate)) {
        return (
            <div>
                <Outlet />
            </div>
        )
    } else {
        return (
            <Navigate to={'/admin'} />
        )
    }
}

export default AuthWrapperCreate