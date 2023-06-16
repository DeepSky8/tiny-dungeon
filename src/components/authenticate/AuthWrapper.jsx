import React from "react";
import { Navigate, Outlet, useOutletContext } from "react-router";
import useLocalStorageState from "use-local-storage-state";

const AuthWrapper = () => {
    const [authCodes] = useOutletContext();
    const [localCode,] = useLocalStorageState('localCode')

    if (localCode !== undefined && authCodes.includes(parseInt(localCode))) {
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

