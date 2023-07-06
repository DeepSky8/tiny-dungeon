import React from "react";
import { Navigate, Outlet, useLocation, useOutletContext } from "react-router";
import strung from "../../functions/strung";


const AuthWrapper = () => {
    const [context] = useOutletContext();
    let location = useLocation();
    const nextLocation = strung(location.pathname.split('/'), '(')

    if (context.sessions.includes(parseInt(context.user.gameSession))) {
        return (<Outlet context={[context.user]} />)
    } else {
        return (<Navigate to={`/settings/${nextLocation}`} />)
    }


}

export default AuthWrapper