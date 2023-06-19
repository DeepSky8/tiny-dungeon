import React, { useState } from "react";
import { auth, logout } from "../../api/firebase";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";


const Footer = ({ }) => {
    let navigate = useNavigate();
    let location = useLocation();
    const here = location.pathname.split('/')[1]
    const [authStatus, setAuthStatus] = useState(auth.currentUser ? 'lock_open' : 'lock')

    const authActions = () => {
        if (auth.currentUser) {
            logout()
            setAuthStatus('lock')
        } else {
            navigate(`/authenticate/${here}`)
        }
    }

    const navActions = () => {
        navigate(here == 'settings' ? '/' : '/settings')
    }


    return (
        <div className="footer__container">
            <Outlet />
            <button
                className={`material-symbols-outlined filled footer__button`}
                onClick={authActions} >
                {`${authStatus}`}
            </button>

            <Link
                className="attribution__linkTo"
                to={'/attribution'}
            >
                Attribution
            </Link>
            <button
                className="material-symbols-outlined filled footer__button"
                onClick={navActions}
            >
                {here == 'settings' ? 'home' : 'settings'}
            </button>
        </div>
    )
}

export default Footer