import React from "react";
import { auth, logout } from "../../api/firebase";
import { Link, useNavigate } from "react-router-dom";


const Footer = ({ authStatus, setAuthStatus }) => {
    let navigate = useNavigate()

    const authActions = () => {
        if (auth.currentUser) {
            logout()
            setAuthStatus('lock')
        } else {
            navigate(`/authenticate`)
        }
    }

    const overviewActions = () => {
        if (auth.currentUser) {
            navigate('/gameMom')
        } else {
            navigate('/authenticate/gameMom')
        }
    }


    return (
        <div className="footer__container">

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
                onClick={overviewActions}
            >
                demography
            </button>
        </div>
    )
}

export default Footer