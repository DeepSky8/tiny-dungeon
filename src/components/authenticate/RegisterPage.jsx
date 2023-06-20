import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    useNavigate,
    useOutletContext,
    useParams
} from "react-router";
import Field from "../display/FieldPencil";
import { auth, registerWithEmailAndPassword } from "../../api/firebase";

const RegisterPage = () => {
    const theme = ''
    const [codes] = useOutletContext();
    const navigate = useNavigate()
    const { back = '' } = useParams()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [user, loading, error] = useAuthState(auth)
    const registerTitle = 'Create New Account'
    const registerText = 'Register now'
    const returnLogin = 'Return to Login'
    const returnApp = 'Return to App'
    const lockAlert = 'Account Registration is currently locked'
    const confirmPasswordAlert = "Please confirm your passwords match"

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) navigate(`/${back}`);
        if (codes.registerLock) {
            alert(lockAlert)
            navigate(`/`)
        }
    }, [user, loading, codes]);


    const registerCheck = () => {
        if (password === confirmPassword) {
            registerWithEmailAndPassword(email, password)
        } else {
            alert(confirmPasswordAlert)
        }

    }


    return (
        <div className={`authPage__container`}>

            <div className={`authPage__container--title ${theme}`}>
                <h3>{registerTitle}</h3>
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

                <Field
                    label={'Confirm Password'}
                    id={'confirmPassword'}
                    type={'text'}
                    value={confirmPassword}
                    change={(e) => {
                        setConfirmPassword(e.target.value)
                    }}
                    blur={() => {
                    }}
                    theme={'centered'}
                    placeholder={'Confirm Password'}
                />
            </div>

            <div className='authPage__container--buttons'>

                <div className="authPage__container--button">
                    <button
                        className={`authPage__login--button ${theme}`}
                        onClick={() => {
                            registerCheck()
                        }}
                    >
                        {registerText}
                    </button>
                </div>

                <hr className="hr__brown" />

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
                            navigate(`/`)
                        }}>
                        {returnApp}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default RegisterPage