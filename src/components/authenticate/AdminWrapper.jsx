import React from "react";
import { Navigate, Outlet, useOutletContext } from "react-router";
import useLocalStorageState from "use-local-storage-state";
import { auth } from "../../api/firebase";

const AdminWrapper = () => {
    const [context] = useOutletContext();
    const [localAdmin,] = useLocalStorageState('localAdmin')


    if (
        (context.localCode !== undefined && context.authCodes.includes(parseInt(localAdmin)))
        // ||
        // (auth.currentUser)
    ) {
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

export default AdminWrapper