import React, { useEffect, useState } from "react";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";
import Field from "../display/Field";
import { useNavigate, useParams } from "react-router";
import useLocalStorageState from "use-local-storage-state";
import strung from "../../functions/strung";

const AuthCode = () => {
    let navigate = useNavigate()
    const { back } = useParams()
    const nextLink = back ? strung(back.split('('), '/') : "/"
    const [localCode, setLocalCode] = useLocalStorageState('localCode')
    const [authCodes, setAuthCodes] = useState([])
    const [enteredCode, setEnteredCode] = useState(localCode ? localCode : '')
    const [message, setMessage] = useState('')

    const errorMessage = 'Double-check that code, please'
    const successMessage = 'Success! Now authenticating'

    useEffect(() => {
        onValue(ref(db, 'authCodes'), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => tempArray.push(snap.val()))
            }
            setAuthCodes(tempArray)
        })

        return (() => {
            off(ref(db, 'authCodes'))
        })
    }, [])

    const checkCode = () => {
        if (authCodes.includes(parseInt(enteredCode))) {
            setLocalCode(parseInt(enteredCode))
            setMessage(successMessage)
            setTimeout(() => { navigate(nextLink) }, 2000)
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

export default AuthCode