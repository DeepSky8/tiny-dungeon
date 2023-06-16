import React from "react";
import { Navigate, Outlet, useOutletContext } from "react-router";
import useLocalStorageState from "use-local-storage-state";

const AuthWrapperCreate = () => {
    const [codes] = useOutletContext();
    const [localAdmin,] = useLocalStorageState('localAdmin')

    if (localAdmin !== undefined && codes.admin.includes(localAdmin)) {
        return (
            <div>
                <Outlet />
            </div>
        )
    } else {
        return (
            <Navigate to={'/adminAccess'} />
        )
    }
}

export default AuthWrapperCreate