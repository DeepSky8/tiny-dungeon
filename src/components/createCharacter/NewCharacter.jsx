import React, { useEffect, useReducer } from "react";
import useLocalStorageState from 'use-local-storage-state';
import { charReducer, defaultChar } from "../../reducers/charReducer";
import { Outlet, useNavigate, useOutletContext } from "react-router";
import NewCharFooter from "../home/NewCharFooter";
import { defaultNextStep, nextStepReducer } from "../../reducers/nextStepReducer";
import { clearNextError, prevStep, takeNextStep } from "../../actions/nextStepActions";
import { startUpdateCharInfo } from "../../actions/charActions";

const NewCharacter = () => {
    let navigate = useNavigate();
    // const [context] = useOutletContext();
    const [gameCode,] = useLocalStorageState('localCode')
    const [charID,] = useLocalStorageState('localCID')

    const [localChar, setLocalChar] = useLocalStorageState('localChar', { defaultValue: defaultChar })
    const [char, dispatchChar] = useReducer(charReducer, localChar)
    const [nextStep, dispatchNext] = useReducer(nextStepReducer, defaultNextStep)

    const handleClickNext = () => {
        setLocalChar(char)
        startUpdateCharInfo({ gameCode, charID, charData: char })
        dispatchNext(takeNextStep(char))
    }

    const handleClickBack = () => {
        setLocalChar(char)
        startUpdateCharInfo({ gameCode, charID, charData: char })
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