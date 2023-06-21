import React, { useEffect, useReducer } from "react";
import { off, onValue, ref } from "firebase/database";
import useLocalStorageState from 'use-local-storage-state';
import { charReducer, defaultChar } from "../../reducers/charReducer";
import { Outlet, useNavigate } from "react-router";
import NewCharFooter from "../home/NewCharFooter";
import { defaultNextStep, nextStepReducer } from "../../reducers/nextStepReducer";
import { clearNextError, prevStep, takeNextStep } from "../../actions/nextStepActions";
import { loadChar, startNewCharKey, startUpdateCharInfo, updateCharID } from "../../actions/charActions";
import { auth, db } from "../../api/firebase";
import { startUpdateCharID } from "../../actions/charActions";

const NewCharacter = () => {
    let navigate = useNavigate();
    const [localCharID, setLocalCharID, { removeItem: removeLocalCharID }] = useLocalStorageState('localCharID')
    const [char, dispatchChar] = useReducer(charReducer, defaultChar)
    const [nextStep, dispatchNext] = useReducer(nextStepReducer, defaultNextStep)

    // useEffect(() => {
    //     console.log('char', char)
    // }, [char])

    useEffect(() => {
        if (auth.currentUser) {

            if (localCharID) {
                startUpdateCharID({ uid: auth.currentUser.uid, currentCharID: localCharID });
                removeLocalCharID()
            }


            if (char.charID === 0) {
                onValue(ref(db, `users/${auth.currentUser.uid}/currentCharID`), snapshot => {
                    if (snapshot.exists()) {
                        const tempID = snapshot.val()

                        onValue(ref(db, `characters/` + snapshot.val()), snapshot => {
                            if (snapshot.exists()) {
                                dispatchChar(loadChar(snapshot.val()))
                            } else {
                                dispatchChar(updateCharID(tempID))
                            }

                        })

                    } else {
                        startNewCharKey().then((newKey) => {
                            startUpdateCharID({ uid: auth.currentUser.uid, currentCharID: newKey })
                            dispatchChar(updateCharID(newKey))
                        })
                    }
                })

            } else (
                onValue(ref(db, `characters/` + char.charID), snapshot => {
                    if (snapshot.exists()) {
                        dispatchChar(loadChar(snapshot.val()))
                    }
                })
            )

        } else {
            if (localCharID) {
                onValue(ref(db, `characters/` + localCharID), snapshot => {
                    if (snapshot.exists()) {
                        dispatchChar(loadChar(snapshot.val()))
                    }
                })
            } else if (localCharID === undefined || localCharID === '') {
                startNewCharKey().then((newKey) => {
                    setLocalCharID(newKey)
                    dispatchChar(updateCharID(newKey))
                })
            }
        }


        return (() => {

            if (localCharID) {
                off(ref(db, `characters/` + localCharID))
            }

            if (auth.currentUser) {
                off(ref(db, `users/${auth.currentUser.uid}`)) // Connection hard-closed on Footer
                off(ref(db, `users/${auth.currentUser.uid}/currentCharID`)) 
            }
        })
    }, [auth.currentUser])



    useEffect(() => {
        if (nextStep.error) {
            alert(nextStep.error)
            dispatchNext(clearNextError())
        }
    }, [nextStep.error])

    useEffect(() => {
        navigate(nextStep.pathRoot + '/' + nextStep.currentStep)
    }, [nextStep.currentStep])


    const handleClickNext = () => {
        console.log('charID', char.charID)
        if (char.charID) {
            startUpdateCharInfo({ char })
            dispatchNext(takeNextStep(char))
        }
    }

    const handleClickBack = () => {
        if (char.charID) {
            startUpdateCharInfo({ char })
            dispatchNext(prevStep(char))
        }
    }



    return (
        <div
            className="newC__container"
            id="newC__container"
        >
            <div
                className="newC__spacer"
                id="newC__spacer"

            >
                <Outlet
                    context={[char, dispatchChar]}
                />
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