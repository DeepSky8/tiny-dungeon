import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, sendPasswordReset } from "../../api/firebase";
import { useNavigate, useParams } from "react-router";
// import { useContext } from "react";
// import ThemeContext from "../context/ThemeContext";
import useLocalStorageState from 'use-local-storage-state';
import Field from "../display/FieldPencil";
import { auth, sendPasswordReset } from "../../api/firebase";

const ResetPage = () => {
    const theme = ""
    // const theme = useContext(ThemeContext)
    const navigate = useNavigate()
    const { back = '' } = useParams()
    const [, setResetEmail] = useLocalStorageState('resetEmail', { defaultValue: "" })
    const [email, setEmail] = useState("");
    const [user, loading,] = useAuthState(auth)
    const resetTitle = 'Password Reset'
    const sendResetEmail = 'Send Password Reset'
    const newAccountText = "Create Account"
    const returnLogin = 'Return to Login'
    const returnApp = 'Return to App'


    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) navigate(`/${back}`);
    }, [user, loading]);

    return (
        <div className={`authPage__container`}>

            <div className={`authPage__container--title ${theme}`}>
                <h3>{resetTitle}</h3>
            </div>

            <hr className="hr__brown" />

            <div className={`authPage__container--login ${theme}`}>
                <Field
                    label={'Email'}
                    id={'email'}
                    type={'text'}
                    value={email}
                    change={(e) => {
                        setEmail(e.target.value)
                    }}
                    blur={() => {
                    }}
                    theme={'centered'}
                    placeholder={'Email Address'}
                />
            </div>

            <div className='authPage__container--buttons'>

                <div className="authPage__container--button">
                    <button
                        className={`authPage__login--button ${theme}`}
                        onClick={() => {
                            sendPasswordReset(email)
                                .then(() => {
                                    setResetEmail(email)
                                })
                                .then(() => {
                                    navigate(`/authenticate/${back}`)
                                })
                        }}
                    >
                        {sendResetEmail}
                    </button>
                </div>

                <hr className="hr__brown" />

                <div className="authPage__container--button">
                    <button
                        className={`authPage__login--button ${theme}`}
                        onClick={() => {
                            navigate(`/register/${back}`)
                        }}>
                        {newAccountText}
                    </button>
                </div>

                <div className="authPage__container--button">
                    <button
                        className={`authPage__login--button ${theme}`}
                        onClick={() => {
                            navigate(`/authenticate/${back}`)
                        }}>
                        {returnLogin}
                    </button>
                </div>

                <div className="authPage__container--button">
                    <button
                        className={`authPage__login--button ${theme}`}
                        onClick={() => {
                            navigate(`/${back}`)
                        }}>
                        {returnApp}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ResetPage