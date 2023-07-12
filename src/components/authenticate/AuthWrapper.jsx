import React from "react";
import { Navigate, Outlet, useLoaderData, useOutletContext } from "react-router";
import useLocalStorageState from "use-local-storage-state";
import strung from "../../functions/strung";
import { onValue, ref } from "firebase/database";
import { auth, db } from "../../api/firebase";

const AuthWrapper = () => {
    const [sessionCodes] = useOutletContext();
    const [sessionCode,] = useLocalStorageState('sessionCode')
    const nextLocation = strung(location.pathname.split('/'), '(')



    if (
        sessionCode !== undefined
        &&
        sessionCodes.includes(parseInt(sessionCode))
        &&
        auth.currentUser
    ) {
        return (
            <div>
                <Outlet />
            </div>
        )
    } else {
        return (
            <Navigate to={`/settings/${nextLocation}`} />
        )
    }
}

export default AuthWrapper



