import React, { useEffect, useState } from "react";
import { auth } from "../../api/firebase";
import Field from "../display/Field";
import { useNavigate, useOutletContext, useParams } from "react-router";
import strung from "../../functions/strung";
import { startCreateUser, startUpdateSessionCode } from "../../actions/userActions";

const EnterSession = () => {
    const [context] = useOutletContext();
    let navigate = useNavigate()
    const { back } = useParams()
    const nextLink = back ? strung(back.split('('), '/') : "/"
    const [enteredCode, setEnteredCode] = useState('')
    const [message, setMessage] = useState('')

    const errorMessage = 'Double-check that code, please'
    const successMessage = 'Success! Now authenticating'

    // useEffect(() => {
    //     console.log('context EnterSession', context)
    // }, [context])

    useEffect(() => {
        if (context.user.gameSession !== 0) {
            setEnteredCode(context.user.gameSession);
        }
    }, [context.user.gameSession])

    const goNext = (location) => {
        setTimeout(() => { navigate(location) }, 2000)

    }

    const checkCode = () => {
        // console.log('nextLink', nextLink)
        // console.log('currentCharID', context.user.currentCharID)
        // console.log('user id', context.user.uid)
        // console.log('auth uid', auth.currentUser.uid)
        if (context.sessions.includes(parseInt(enteredCode))) {
            if (context.user.uid === "") {
                startCreateUser({ uid: auth.currentUser.uid, authProvider: 'anonymous' })
            }
            startUpdateSessionCode({ uid: auth.currentUser.uid, session: parseInt(enteredCode) })
            setMessage(successMessage)

            if (nextLink === "/characterSheet" && context.user.currentCharID === "") {
                goNext('/newCharacter/heritage')
            } else {
                goNext(nextLink)
            }

        } else {
            setMessage(errorMessage)
        }
    }

    return (
        <div className="authCode__container authCode__spacer--xsmall centered">
            <div className="bold centered extraLarge">
                Join Game
            </div>
            <div className="authCode__container--text">
                <div className="authCode__text">
                    Please enter a game code
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

export default EnterSession