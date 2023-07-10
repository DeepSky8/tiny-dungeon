import React from "react";
import { Navigate, Outlet, useOutletContext } from "react-router";
import useLocalStorageState from "use-local-storage-state";
import strung from "../../functions/strung";

const AuthWrapper = () => {
    const [context] = useOutletContext();
    const [localCode,] = useLocalStorageState('localCode')
    const nextLocation = strung(location.pathname.split('/'), '(')



    if (localCode !== undefined && context.sessions.includes(parseInt(localCode))) {
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

