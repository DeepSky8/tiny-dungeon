import React, { useState } from "react";
import Field from "../display/Field";
import { useNavigate, useOutletContext } from "react-router";
import useLocalStorageState from "use-local-storage-state";

const AdminCode = () => {
    const [codes] = useOutletContext();
    let navigate = useNavigate()
    const [localAdmin, setLocalAdmin] = useLocalStorageState('localAdmin')
    // const [authCodes, setAuthCodes] = useState([])
    const [enteredCode, setEnteredCode] = useState(localAdmin ? localAdmin : '')
    const [message, setMessage] = useState('')

    const errorMessage = 'Double-check that code, please'

    // useEffect(() => {
    //     onValue(ref(db, 'adminCodes'), snapshot => {
    //         const tempArray = []
    //         if (snapshot.exists()) {
    //             snapshot.forEach(snap => tempArray.push(snap.val()))
    //         }
    //         setAuthCodes(tempArray)
    //     })

    //     return (() => {
    //         off(ref(db, 'adminCodes'))
    //     })
    // }, [])

    const checkCode = () => {
        console.log('adminCodes', codes.admin)
        console.log('enteredCode', enteredCode)
        if (codes.admin.includes(parseInt(enteredCode))) {
            setLocalAdmin(parseInt(enteredCode))
            navigate('/admin')
        } else {
            setMessage(errorMessage)
        }
    }

    return (
        <div className="authCode__container authCode__spacer--xsmall centered">
            <div className="bold centered extraLarge">
                Admin
            </div>
            <div className="authCode__container--text">
                <div className="authCode__text">
                    Please enter a code
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

export default AdminCode