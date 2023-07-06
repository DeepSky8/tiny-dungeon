import React, { useEffect, useReducer } from "react";
import { defaultNextStep, nextStepReducer } from "../../reducers/nextStepReducer";
import { useNavigate, useParams } from "react-router";
import { charReducer, defaultChar } from "../../reducers/charReducer";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../../api/firebase";
import { clearNextError, prevStep, setStepInitialTraits, takeNextStep } from "../../actions/nextStepActions";
import { loadChar, startNewCharKey, startUpdateCharID, startUpdateCharInfo } from "../../actions/charActions";




const NewCharFooter = ({ session }) => {
    let navigate = useNavigate();
    const { charID } = useParams()
    const [nextStep, dispatchNext] = useReducer(nextStepReducer, { ...defaultNextStep, stepCharID: charID })
    const [char, dispatchChar] = useReducer(charReducer, defaultChar)

    const beginning = (nextStep.currentStep === 'heritage' ? 'beginning' : '');

    // useEffect(() => {
    //     console.log('session', session)
    // }, [session])

    useEffect(() => {
        if (session.initialTraits) {
            dispatchNext(setStepInitialTraits(session.initialTraits))
        }
    }, [session])

    useEffect(() => {
        if (charID && charID !== 0) {
            onValue(ref(db, `characters/${charID}`), snapshot => {

                if (snapshot.exists()
                    && snapshot.val().userID === auth.currentUser.uid
                ) {
                    dispatchChar(loadChar(snapshot.val()))
                }

            })
        }
        //  else {
        //     startNewCharKey().then((newKey) => {
        //         startUpdateCharID({ uid: auth.currentUser.uid, currentCharID: newKey })
        //         updateIDs({ uid: auth.currentUser.uid, charID: newKey })
        //     })
        // }

        return (() => {

            if (charID && charID !== 0) {
                off(ref(db, `characters/${charID}`))
            }
        })
    }, [charID])

    useEffect(() => {
        if (nextStep.error) {
            alert(nextStep.error)
            dispatchNext(clearNextError())
        }
    }, [nextStep.error])

    useEffect(() => {
        navigate(`${nextStep.pathRoot}/${nextStep.currentStep}/${nextStep.stepCharID}`)
    }, [nextStep.currentStep])

    const handleClickNext = () => {
        console.log('charNext', char)
        if (char.charID === 0 && char.heritageID) {
            startNewCharKey()
                .then((newKey) => {
                    startUpdateCharID({ uid: auth.currentUser.uid, currentCharID: newKey })
                    return newKey
                    // updateIDs({ uid: auth.currentUser.uid, charID: newKey })
                })
                .then((newKey) => {
                    // console.log('next then', { ...char, charID: newKey })
                    startUpdateCharInfo({ char: { ...char, charID: newKey } })
                    dispatchNext(takeNextStep(char))
                })
            // .then(() => {
            //     navigate(`${nextStep.pathRoot}/${nextStep.currentStep}/${nextStep.stepCharID}`)
            // })
        }

        if (char.charID !== 0) {
            // console.log('firing update step',)
            // startUpdateCharInfo({ char: char })
            dispatchNext(takeNextStep(char))
            // .then(() => {
            //     console.log('firing navigate step',)
            //     navigate(`${nextStep.pathRoot}/${nextStep.currentStep}/${nextStep.stepCharID}`)
            // })
        }

        if (char.charID === 0 && char.heritageID === '') {
            location.reload()
        }
    }

    const handleClickBack = () => {
        if (char.charID !== 0) {
            // startUpdateCharInfo({ char: char })
            dispatchNext(prevStep(char))
            // .then(() => {
            //     navigate(`${nextStep.pathRoot}/${nextStep.currentStep}/${nextStep.stepCharID}`)
            // })
        }
    }

    return (
        <div className="newCharFooter__container">
            <button
                onClick={handleClickBack}
                className={`newCharFooter__button--back ${beginning}`}
                disabled={beginning}
            >Back</button>
            <button
                className="newCharFooter__button--next"
                onClick={handleClickNext}
            >{nextStep.buttonText}</button>

        </div>
    )
}

export default NewCharFooter