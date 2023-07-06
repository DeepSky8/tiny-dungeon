import React, { useEffect, useState } from "react";
import { auth, db, logout } from "../../api/firebase";
import { off, ref } from "firebase/database";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";


const Footer = ({  }) => {
    let navigate = useNavigate();
    let location = useLocation();
    const here = location.pathname.split('/')[1]
    const [authStatus, setAuthStatus] = useState('lock')

    useEffect(() => {
        if (auth.currentUser && !auth.currentUser.isAnonymous) {
            setAuthStatus('lock_open')
        } else {
            setAuthStatus('lock')
        }
    }, [auth])

    const authActions = () => {
        if (!auth.currentUser.isAnonymous) {
            // Connections established on NewCharacter
            off(ref(db, `users/${auth.currentUser.uid}`))
            off(ref(db, `users/${auth.currentUser.uid}/currentCharID`))

            setAuthStatus('lock')
            logout()
            window.location.reload()
        } else {
            // navigate(`/authenticate`)
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