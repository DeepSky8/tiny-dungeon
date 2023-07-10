import React, { useEffect, useReducer } from "react";
import useLocalStorageState from 'use-local-storage-state';
import { charReducer, defaultChar } from "../../reducers/charReducer";
import { Outlet, useLoaderData, useNavigate } from "react-router";
import NewCharFooter from "../home/NewCharFooter";
import { defaultNextStep, nextStepReducer } from "../../reducers/nextStepReducer";
import { clearNextError, prevStep, setStepInitialTraits, takeNextStep } from "../../actions/nextStepActions";
import { startUpdateCharInfo } from "../../actions/charActions";
import { defaultSessionSettings, sessionSettingsReducer } from "../../reducers/sessionSettingsReducer";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";
import { loadSession } from "../../actions/sessionSettingsActions";

const NewCharacter = () => {
    let navigate = useNavigate();
    // const [context] = useOutletContext();
    // const [gameCode,] = useLocalStorageState('localCode')
    // const [charID,] = useLocalStorageState('localCID')
    const [sessionCode, ,] = useLocalStorageState('sessionCode')

    const [localChar, setLocalChar] = useLocalStorageState('localChar', { defaultValue: defaultChar })
    const [char, dispatchChar] = useReducer(charReducer, localChar)

    const [sessionSettings, setSessionSettings] = useReducer(sessionSettingsReducer, defaultSessionSettings)
    const [nextStep, dispatchNext] = useReducer(nextStepReducer, defaultNextStep)

    // useEffect(() => {

    // },[])

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
        // startUpdateCharInfo({ gameCode, charID, charData: char })
        dispatchNext(takeNextStep(char))
    }

    const handleClickBack = () => {
        setLocalChar(char)
        // startUpdateCharInfo({ gameCode, charID, charData: char })
        dispatchNext(prevStep(char))
    }

    useEffect(() => {
        if (nextStep.error) {
            alert(nextStep.error)
            dispatchNext(clearNextError())
        }
    }, [nextStep.error])

    useEffect(() => {
        navigate(nextStep.pathRoot + '/' + nextStep.currentStep)
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