import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router";
// import { useContext } from "react";
// import ThemeContext from "../context/ThemeContext";
import useLocalStorageState from 'use-local-storage-state';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../api/firebase";
import Field from "../display/FieldPencil";

const AuthPage = () => {
    const theme = ''
    // const theme = useContext(ThemeContext)
    const navigate = useNavigate()
    const { back = '' } = useParams()
    const [resetEmail, setResetEmail, { removeItem }] = useLocalStorageState('resetEmail', { defaultValue: '' })
    const [email, setEmail] = useState(resetEmail)
    const [password, setPassword] = useState("")
    const [user, loading, error] = useAuthState(auth)
    const loginTitle = 'Login'
    const emailText = 'Login with Email'
    const newAccountText = "Create Account"
    const resetPasswordText = 'Reset Password'
    const googleText = 'Login with Google'
    const returnApp = 'Return to App'


    // useEffect(() => {
    //     if (loading) {
    //         return;
    //     }
    //     if (user) {
    //         removeItem();
    //         navigate(`/${back}`)
    //     };
    // }, [user, loading]);



    const loginEmail = () => {
        logInWithEmailAndPassword(email, password)
            .then(() => {
                navigate(`/${back}`)
                // if (user) {
                // }
                // else {
                //     alert('User not found')
                // }
            })
    }

    return (
        <div className={`authPage__container`}>
            <hr className="hr__brown" />

            <div className={`authPage__container--title ${theme}`}>
                <h3>{loginTitle}</h3>
            </div>

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

                <Field
                    label={'Password'}
                    id={'password'}
                    type={'text'}
                    value={password}
                    change={(e) => {
                        setPassword(e.target.value)
                    }}
                    blur={() => {
                    }}
                    theme={'centered'}
                    placeholder={'Password'}
                />
            </div>

            <div className='authPage__container--buttons'>

                <div className="authPage__container--button">
                    <button
                        className={`authPage__login--button ${theme}`}
                        onClick={loginEmail}
                    >
                        {emailText}
                    </button>
                </div>

                <div className="authPage__container--button">
                    <button className={`authPage__login--button ${theme}`}
                        onClick={signInWithGoogle}
                    >
                        {googleText}
                    </button>
                </div>

                <hr className="hr__brown" />

                <div className="authPage__container--button">
                    <button
                        className={`authPage__login--button ${theme}`}
                        onClick={() => {
                            navigate(`/authenticate/reset`)
                        }}
                    >
                        {resetPasswordText}
                    </button>
                </div>

                <div className="authPage__container--button">
                    <button
                        className={`authPage__login--button ${theme}`}
                        onClick={() => {
                            navigate(`/authenticate/register/${back}`)
                        }}>
                        {newAccountText}
                    </button>
                </div>



                <div className="authPage__container--button">
                    <button
                        className={`authPage__login--button ${theme}`}
                        onClick={() => {
                            navigate(`/`)
                        }}>
                        {returnApp}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default AuthPage

