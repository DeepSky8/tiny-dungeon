import React, { useState } from "react";
import { auth } from "../../api/firebase";
import { signInAnonymously } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth";
import Field from "../display/Field";
import { useNavigate, useOutletContext, useParams } from "react-router";
import strung from "../../functions/strung";
import useLocalStorageState from "use-local-storage-state";


const JoinSession = () => {
    const [sessionCodes] = useOutletContext();
    const [user, loading, error] = useAuthState(auth)
    let navigate = useNavigate()
    const { back } = useParams()
    const nextLink = back ? strung(back.split('('), '/') : "/"
    const [sessionCode, setSessionCode, { removeItem: removeSession }] = useLocalStorageState('sessionCode')
    const [enteredCode, setEnteredCode] = useState(sessionCode ? sessionCode : "")
    const [message, setMessage] = useState('')

    const errorMessage = 'Double-check that code, please'
    const successMessage = 'Success! Now authenticating'

    const enterSessionCode = "Please enter a session code"
    const currentSessionCode = 'Current session'


    const goNext = (location) => {
        setTimeout(() => { navigate(location) }, 2000)

    }

    const enterSession = (user = auth.currentUser) => {
        setSessionCode(parseInt(enteredCode))
        setMessage(successMessage)

        if (nextLink === "/characterSheet") {
            goNext('/')
        } else {
            goNext(nextLink)
        }
    }

    const checkCode = () => {
        if (sessionCodes.includes(parseInt(enteredCode))) {
            if (!user) {
                signInAnonymously(auth)
            }
            enterSession();
        } else {
            setMessage(errorMessage)
        }
    }

    return (
        <div className="joinSession__container joinSession__spacer centered">

            <hr className="hr__brown" />

            <div className="joinSession__container--text">
                <div className="joinSession__text">
                    {enteredCode ? currentSessionCode : enterSessionCode}
                </div>

            </div>
            <div className="joinSession__container--field">
                <Field
                    label={''}
                    aria={'Game Code'}
                    id={'gameCode'}
                    type={'number'}
                    value={enteredCode}
                    change={(e) => {
                        setMessage('')
                        setEnteredCode(e.target.value)
                    }}
                    blur={() => {
                    }}
                    theme={''}
                    placeholder={'1234'}
                />
            </div>


            <div className="joinSession__spacer--medium">
                <button
                    className="joinSession__button--submit"
                    onClick={checkCode}
                >Submit</button>
            </div>

            <div className="joinSession__container--text">
                <div className="joinSession__message">
                    {message}
                </div>
            </div>
        </div>
    )
}

export default JoinSession

// <div className="bold centered extraLarge">
// Join Game
// </div>