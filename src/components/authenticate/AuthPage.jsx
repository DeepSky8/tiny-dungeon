import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useOutletContext, useParams } from "react-router";
import useLocalStorageState from 'use-local-storage-state';
import { auth, googleProvider, logInWithEmailAndPassword, signInWithGoogle } from "../../api/firebase";
import Field from "../display/FieldPencil";
import { GoogleAuthProvider, getRedirectResult, linkWithCredential, signInWithRedirect } from "firebase/auth";
import { startUpdateCurrentCharID } from "../../actions/userActions";

const AuthPage = () => {
    const theme = ''
    const [context] = useOutletContext()
    const [anonCharID, setAnonCharID] = useState(context.user.currentCharID)
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

    useEffect(() => {
        // if (loading) {
        //     return;
        // }
        if (!auth.currentUser.isAnonymous) {
            removeItem();
            navigate(`/${back}`)
        };
    }, [user]);

    useEffect(() => {
        console.log('anonCharID', anonCharID)
        setAnonCharID(context.user.currentCharID)
        console.log('set Anon', context.user.currentCharID)
    }, [])


    const loginEmail = () => {
        logInWithEmailAndPassword({email, password, anonCharID})
            // .then((user) => {
            //     console.log('AuthPage user', user)
            //     startUpdateCurrentCharID({ uid: user.uid, currentCharID: anonCharID })
            // })
    }

    const loginGmail = () => {
        signInWithRedirect(auth, googleProvider)
        getRedirectResult(auth)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // const newCredential = GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
                linkWithCredential(auth.currentUser, credential)
                    .then((usercred) => {
                        const user = usercred.user;
                        console.log('success!', user)
                        return user
                    })
                    .then((user) => {
                        startUpdateCurrentCharID({ uid: user.uid, currentCharID: anonCharID })
                    })
                    .catch((error) => {
                        alert(error)
                    })
            })

    }

    return (
        <div className={`authPage__container`}>

            <div className={`authPage__container--title ${theme}`}>
                <h3>{loginTitle}</h3>
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
                        onClick={loginGmail}
                    >
                        {googleText}
                    </button>
                </div>

                <hr className="hr__brown" />

                <div className="authPage__container--button">
                    <button
                        className={`authPage__login--button ${theme}`}
                        onClick={() => {
                            navigate(`/reset`)
                        }}
                    >
                        {resetPasswordText}
                    </button>
                </div>

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