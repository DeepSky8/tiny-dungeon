import React from "react";
import { Navigate, Outlet, useOutletContext } from "react-router";
import useLocalStorageState from "use-local-storage-state";
import { auth } from "../../api/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


const AuthWrapper = () => {
    const [codes] = useOutletContext();
    const [localCode,] = useLocalStorageState('localCode')
    const [user, loading, error] = useAuthState(auth)

    if (
        (auth.currentUser)
        ||
        (localCode !== undefined && codes.authCodes.includes(parseInt(localCode)))
    ) {
        return (
            <Outlet />
        )
    } else {
        return (
            <Navigate to={'/settings'} />
        )
    }
}

export default AuthWrapper

