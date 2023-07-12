import React, { useEffect, useReducer, useState } from "react";
import useLocalStorageState from 'use-local-storage-state';
import { charReducer, defaultChar } from "../../reducers/charReducer";
import { Outlet, useNavigate } from "react-router";
import NewCharFooter from "../home/NewCharFooter";
import { defaultNextStep, nextStepReducer } from "../../reducers/nextStepReducer";
import { clearNextError, prevStep, setStepInitialTraits, takeNextStep } from "../../actions/nextStepActions";
import { loadChar, startNewCharKey, startUpdateChar, startUpdateCharID, updateCharID } from "../../actions/charActions";
import { defaultSessionSettings, sessionSettingsReducer } from "../../reducers/sessionSettingsReducer";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../../api/firebase";
import { loadSession } from "../../actions/sessionSettingsActions";
import saveAsNewChar from "../../functions/saveAsNewChar";

const NewCharacter = () => {
    let navigate = useNavigate();
    const [sessionCode, ,] = useLocalStorageState('sessionCode')
    const [cloudCharID, setCloudCharID] = useState('')
    const [localChar, setLocalChar] = useLocalStorageState('localChar', { defaultValue: defaultChar })
    const [char, dispatchChar] = useReducer(charReducer, localChar)

    const [sessionSettings, setSessionSettings] = useReducer(sessionSettingsReducer, defaultSessionSettings)
    const [nextStep, dispatchNext] = useReducer(nextStepReducer, defaultNextStep)

    useEffect(() => {
        if (auth.currentUser) {
            onValue(ref(db, `users/${auth.currentUser.uid}/charID`), snapshot => {
                if (snapshot.exists()) {
                    setCloudCharID(snapshot.val())
                }
            })
        }

        return (() => {
            if (auth.currentUser) {
                off(ref(db, `users/${auth.currentUser.uid}/charID`))
            }
        })
    }, [auth.currentUser])

    useEffect(() => {
        if (cloudCharID) {
            onValue(ref(db, `characters/${cloudCharID}`), snapshot => {
                if (snapshot.exists()) {
                    dispatchChar(loadChar(snapshot.val()))
                }
            })
        }

        return (() => {
            if (localChar.charID !== 0) {
                off(ref(db, `characters/${cloudCharID}`))
            }
        })
    }, [cloudCharID])

    useEffect(() => {
        if (sessionCode) {
            onValue(ref(db, `sessionInfo/${sessionCode}`), snapshot => {
                if (snapshot.exists()) {
                    setSessionSettings(loadSession(snapshot.val()))
                    dispatchNext(setStepInitialTraits(snapshot.val().initialTraits))
                } else {
                    setSessionSettings(loadSession(defaultSessionSettings))
                    dispatchNext(setStepInitialTraits(sessionSettings.initialTraits))
                }
            })
        }

        return (() => {
            off(ref(db, `sessionInfo/${sessionCode}`))
        })
    }, [sessionCode])

    const handleClickNext = () => {
        setLocalChar(char)
        dispatchNext(takeNextStep(char))
    }

    const handleClickBack = () => {
        setLocalChar(char)
        dispatchNext(prevStep(char))
    }

    useEffect(() => {
        if (nextStep.error) {
            alert(nextStep.error)
            dispatchNext(clearNextError())
        }
    }, [nextStep.error])

    useEffect(() => {
        if (nextStep.pathRoot === '/characterSheet' && localChar.charID === 0) {
            saveAsNewChar({ char: char })
                .then((charID) => {
                    dispatchChar(updateCharID(charID))
                    setLocalChar({ ...char, charID })
                })
                .then(() => {
                    console.log('nextStep', nextStep)
                    navigate(nextStep.pathRoot + '/' + nextStep.currentStep)
                })
            // startNewCharKey()
            //     .then((newCharID) => {
            //         startUpdateCharID({ uid: auth.currentUser.uid, charID: newCharID })
            //         return newCharID
            //     })
            //     .then((charID) => {
            //         startUpdateChar(
            //             {
            //                 uid: auth.currentUser.uid,
            //                 charData: {
            //                     ...char,
            //                     charCreated: Date.now(),
            //                     charID: charID
            //                 }
            //             }
            //         )
            //         return charID
            //     })
            //     .then((charID) => {
            //         dispatchChar(updateCharID(charID))
            //         setLocalChar({ ...char, charID: charID })
            //     })

            //     .then(() => {
            //         navigate(nextStep.pathRoot + '/' + nextStep.currentStep)
            //     })
            //     .catch((error) => {
            //         console.log('Error encountered', error)
            //     })
        } else if (char.charID) {
            startUpdateChar({ uid: auth.currentUser.uid, charData: char })
                .then(() => {
                    navigate(nextStep.pathRoot + '/' + nextStep.currentStep)
                })
        } else {
            navigate(nextStep.pathRoot + '/' + nextStep.currentStep)

        }
    }, [nextStep.currentStep])

    return (
        <div
            className="newC__container"
            id="newC__container"
        >
            <div
                className="newC__spacer"
                id="newC__spacer"
            >
                <Outlet context={[char, dispatchChar]} />

                <NewCharFooter
                    state={nextStep}
                    handleClickBack={handleClickBack}
                    handleClickNext={handleClickNext}
                />
            </div>
        </div>
    )

}

export default NewCharacter