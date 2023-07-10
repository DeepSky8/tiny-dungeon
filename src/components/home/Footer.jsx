import React, { useEffect, useState } from "react";
import { auth, db, logout } from "../../api/firebase";
import { off, onValue, ref } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth"

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";


const Footer = ({ }) => {
    let navigate = useNavigate();
    let location = useLocation();
    const here = location.pathname.split('/')[1]
    const useHere = here === 'authenticate' ? '' : here
    const [authStatus, setAuthStatus] = useState(auth.currentUser ? 'lock_open' : 'lock')

    useEffect(() => {
        console.log('auth.currentUser', auth.currentUser)
        if (auth.currentUser) {
            setAuthStatus('lock_open')
        } else {
            setAuthStatus('lock')
        }
    }, [auth.currentUser])


    const authActions = () => {
        console.log('auth.currentUser', auth.currentUser)
        if (here == 'authenticate') {
            navigate('/')
        } else if (auth.currentUser && authStatus === 'lock_open') {
            // Connections established on NewCharacter
            off(ref(db, `users/${auth.currentUser.uid}`))
            off(ref(db, `users/${auth.currentUser.uid}/currentCharID`))

            setAuthStatus('lock')
            logout()
            // window.location.reload()
        } else {
            // navigate(`/authenticate`)
            navigate(`/authenticate/${useHere}`)

        }
    }


    const navActions = () => {
        navigate(here == 'settings' ? '/' : '/settings')
    }


    return (
        <div className="footer__container">
            <button
                className={`material-symbols-outlined filled footer__button`}
                onClick={authActions} >
                {here == 'authenticate' ? 'home' : `${authStatus}`}
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