import React, { useEffect, useState } from "react";
import { auth, db, logout } from "../../api/firebase";
import { off, onValue, ref } from "firebase/database";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { defaultUserState } from "../../reducers/userReducer";


const Footer = ({ }) => {
    let navigate = useNavigate();
    let location = useLocation();
    const [localUser, setLocalUser, { removeItem: removeLocalUser }] = useLocalStorageState('localUser', { defaultValue: defaultUserState })
    const [sessionCode, setSessionCode, { removeItem: removeSessionCode }] = useLocalStorageState('sessionCode')
    const here = location.pathname.split('/')[1]
    const useHere = here === 'authenticate' ? '' : here
    const [authStatus, setAuthStatus] = useState(localUser.uid ? 'lock_open' : 'lock')

    useEffect(() => {
        if (auth.currentUser) {
            onValue(ref(db, `/users/${auth.currentUser.uid}`), snapshot => {
                if (snapshot.exists()) {
                    setLocalUser({ ...snapshot.val(), uid: true })
                    setAuthStatus('lock_open')
                } else {
                    setAuthStatus('lock')
                }
            })
        }

        return (() => {
            if (auth.currentUser) {
                off(ref(db, `users/${auth.currentUser.uid}`))
                setAuthStatus('lock')
            }
        })
    }, [auth.currentUser])


    const authActions = () => {
        if (here == 'authenticate') {
            navigate('/')
        } else if (auth.currentUser && authStatus === 'lock_open') {
            // Connections established on NewCharacter
            off(ref(db, `users/${auth.currentUser.uid}`))
            off(ref(db, `users/${auth.currentUser.uid}/charID`))

            setAuthStatus('lock')
            logout()
            removeLocalUser()
            removeSessionCode()
        } else {
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