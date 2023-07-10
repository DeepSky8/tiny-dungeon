import React, { useEffect, useState } from "react";
import { auth } from "../../api/firebase";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth";
import Field from "../display/Field";
import { useNavigate, useOutletContext, useParams } from "react-router";
import strung from "../../functions/strung";
import { startCreateUser, startUpdateSessionCode } from "../../actions/userActions";
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


    // useEffect(() => {
    //     console.log('sessions', sessions)
    // }, [sessions])
    // useEffect(() => {
    //     console.log('context EnterSession', context)
    // }, [context])

    // useEffect(() => {
    //     if (context.user.gameSession !== 0) {
    //         setEnteredCode(context.user.gameSession);
    //     }
    // }, [context.user.gameSession])

    const goNext = (location) => {
        setTimeout(() => { navigate(location) }, 2000)

    }

    const enterSession = (user = auth.currentUser) => {
        // startUpdateSessionCode({ uid: user.uid, session: parseInt(enteredCode) })
        setSessionCode(parseInt(enteredCode))
        setMessage(successMessage)

        if (nextLink === "/characterSheet") {
            goNext('/')
        } else {
            goNext(nextLink)
        }
    }

    // onAuthStateChanged(auth, (user) => {
    //     console.log('user', user)
    //     if (user && user.isAnonymous) {
    //         startCreateUser({ uid: auth.currentUser.uid, authProvider: 'anonymous' })
    //             .then(() => {
    //                 enterSession(user)
    //             })
    //     }
    // })

    // useEffect(() => {
    //     if (auth.currentUser !== null && auth.currentUser.isAnonymous) {
    //         startCreateUser({ uid: auth.currentUser.uid, authProvider: 'anonymous' })
    //             // .then(() => {
    //             //     enterSession(user)
    //             // })
    //     }
    // }, [auth.currentUser])



    const checkCode = () => {
        // console.log('nextLink', nextLink)
        // console.log('currentCharID', context.user.currentCharID)
        // console.log('user id', context.user.uid)
        // console.log('auth uid', auth.currentUser.uid)
        if (sessionCodes.includes(parseInt(enteredCode))) {
            if (!user) {
                signInAnonymously(auth)
            }
            enterSession();
            // startUpdateSessionCode({ uid: auth.currentUser.uid, session: parseInt(enteredCode) })
            // setMessage(successMessage)

            // if (nextLink === "/characterSheet") {
            //     goNext('/')
            // } else {
            //     goNext(nextLink)
            // }

        } else {
            setMessage(errorMessage)
        }
    }

    return (
        <div className="authCode__container authCode__spacer--xsmall centered">

            <div className="authCode__container--text">
                <div className="authCode__text">
                    {sessionCode ? currentSessionCode : enterSessionCode}
                </div>

            </div>
            <div className="authCode__container--field">
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


            <div className="authCode__spacer--medium">
                <button
                    className="authCode__button--submit"
                    onClick={checkCode}
                >Submit</button>
            </div>

            <div className="authCode__container--text">
                <div className="authCode__message">
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