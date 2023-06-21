import React, { useEffect, useState } from "react";
import { auth, db, logout } from "../../api/firebase";
import { off, onValue, ref } from "firebase/database";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";


const Footer = ({ }) => {
    let navigate = useNavigate();
    let location = useLocation();
    const here = location.pathname.split('/')[1]
    const [authStatus, setAuthStatus] = useState(auth.currentUser ? 'lock_open' : 'lock')

    useEffect(() => {
        if (auth.currentUser) {
            setAuthStatus('lock_open')
        } else {
            setAuthStatus('lock')
        }
    }, [auth])

    const authActions = () => {
        if (auth.currentUser) {
            logout()
            off(ref(db, `users/${auth.currentUser.uid}`))
            // Connections established on NewCharacter
            off(ref(db, `users/${auth.currentUser.uid}/currentCharID`))

            setAuthStatus('lock')
        } else {
            navigate(`/authenticate/${here}`)
        }
    }

    const navActions = () => {
        navigate(here !== '' ? '/' : '/settings')
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
                {here == '' ? 'settings' : 'home'}
            </button>
        </div>
    )
}

export default Footer