import React, { useEffect, useReducer } from "react";
import { charReducer, defaultChar } from "../../reducers/charReducer";
import { Outlet, useNavigate } from "react-router";
import NewCharFooter from "../home/NewCharFooter";
import { defaultNextStep, nextStepReducer } from "../../reducers/nextStepReducer";
import { clearNextError, prevStep, takeNextStep } from "../../actions/nextStepActions";

const NewCharacter = () => {
    let navigate = useNavigate();
    const [char, dispatchChar] = useReducer(charReducer, defaultChar)
    const [nextStep, dispatchNext] = useReducer(nextStepReducer, defaultNextStep)

    // useEffect(() => {
    //     console.log('char', char)
    // }, [char])

    // useEffect(() => {
    //     console.log('nextStep', nextStep)
    // }, [nextStep])

    const handleClickNext = () => {
        dispatchNext(takeNextStep(char))
    }

    const handleClickBack = () => {
        dispatchNext(prevStep())
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
        <div className="newC__container">
            <div className="newC__spacer">
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