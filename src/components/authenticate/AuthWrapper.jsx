import React from "react";
import { Navigate, Outlet, useOutletContext } from "react-router";
import useLocalStorageState from "use-local-storage-state";

const AuthWrapper = () => {
    const [codes] = useOutletContext();
    const [localCode,] = useLocalStorageState('localCode')

    if (localCode !== undefined && codes.auth.includes(parseInt(localCode))) {
        return (
            <div>
                <Outlet />
            </div>
        )
    } else {
        return (
            <Navigate to={'/join'} />
        )
    }
}

export default AuthWrapper

