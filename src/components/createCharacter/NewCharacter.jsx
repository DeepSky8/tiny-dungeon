import React, { useEffect, useReducer } from "react";
import { Outlet, useNavigate, useOutletContext, useParams } from "react-router";
import { off, onValue, ref } from "firebase/database";
import { charReducer, defaultChar } from "../../reducers/charReducer";
import NewCharFooter from "../home/NewCharFooter";
import { defaultNextStep, nextStepReducer } from "../../reducers/nextStepReducer";
import { clearNextError, prevStep, setStepCharID, setStepInitialTraits, takeNextStep } from "../../actions/nextStepActions";
import { loadChar, startNewCharKey, startUpdateCharInfo, updateCharID, updateUserID } from "../../actions/charActions";
import { auth, db } from "../../api/firebase";
import { startUpdateCharID } from "../../actions/charActions";
import { defaultUserState, userReducer } from "../../reducers/userReducer";
import { loadUser } from "../../actions/userActions";
import { defaultSession, sessionReducer } from "../../reducers/sessionReducer";
import { loadSession } from "../../actions/sessionActions";

const NewCharacter = () => {
    // const { charID } = useParams();
    const [context] = useOutletContext();
    // let navigate = useNavigate();
    // const [user, dispatchUser] = useReducer(userReducer, defaultUserState)
    // const [char, dispatchChar] = useReducer(charReducer, defaultChar)
    const [session, dispatchSession] = useReducer(sessionReducer, defaultSession)

    // const [nextStep, dispatchNext] = useReducer(nextStepReducer, { ...defaultNextStep, stepCharID: charID })

    // useEffect(() => {
    //     console.log('char', char)
    // }, [char])


    // useEffect(() => {
    //     console.log('context', context)
    // }, [context])
    // useEffect(() => {
    //     onValue(ref(db, `users/${auth.currentUser.uid}`), snapshot => {
    //         if (snapshot.exists()) {
    //             dispatchUser(loadUser(snapshot.val()))
    //         }
    //     })

    //     return (() => {
    //         off(ref(db, `users/${auth.currentUser.uid}`))
    //     })
    // }, [auth.currentUser.uid])

    // const updateIDs = ({ uid, charID }) => {
    //     dispatchChar(updateUserID(uid))
    //     dispatchChar(updateCharID(charID))
    // }

    // useEffect(() => {
    //     if (charID && charID !== 0) {
    //         onValue(ref(db, `characters/${charID}`), snapshot => {

    //             if (snapshot.exists()
    //                 && snapshot.val().userID === auth.currentUser.uid
    //             ) {
    //                 dispatchChar(loadChar(snapshot.val()))
    //             }

    //         })
    //     }
    //     //  else {
    //     //     startNewCharKey().then((newKey) => {
    //     //         startUpdateCharID({ uid: auth.currentUser.uid, currentCharID: newKey })
    //     //         updateIDs({ uid: auth.currentUser.uid, charID: newKey })
    //     //     })
    //     // }

    //     return (() => {

    //         if (charID && charID !== 0) {
    //             off(ref(db, `characters/${charID}`))
    //         }
    //     })
    // }, [charID])


    useEffect(() => {
        if (context.gameSession)
            onValue(ref(db, `sessionInfo/${context.gameSession}`), snapshot => {
                if (snapshot.exists()) {
                    dispatchSession(loadSession(snapshot.val()))
                    // dispatchNext(setStepInitialTraits(snapshot.val().initialTraits))
                }
            }
                // , {
                //     onlyOnce: true
                // }
            )


        return (() => {
            off(ref(db, `sessionInfo/${context.gameSession}`))
        })
    }, [context.gameSession])


    // useEffect(() => {
    //     if (nextStep.error) {
    //         alert(nextStep.error)
    //         dispatchNext(clearNextError())
    //     }
    // }, [nextStep.error])

    // useEffect(() => {
    //     navigate(`${nextStep.pathRoot}/${nextStep.currentStep}/${nextStep.stepCharID}`)
    // }, [nextStep.currentStep])


    // const handleClickNext = () => {
    //     console.log('charNext', char)
    //     if (char.charID === 0 && char.heritageID) {
    //         startNewCharKey()
    //             .then((newKey) => {
    //                 startUpdateCharID({ uid: auth.currentUser.uid, currentCharID: newKey })
    //                 return newKey
    //                 // updateIDs({ uid: auth.currentUser.uid, charID: newKey })
    //             })
    //             .then((newKey) => {
    //                 // console.log('next then', { ...char, charID: newKey })
    //                 startUpdateCharInfo({ char: { ...char, charID: newKey } })
    //                 dispatchNext(takeNextStep(char))
    //             })
    //         // .then(() => {
    //         //     navigate(`${nextStep.pathRoot}/${nextStep.currentStep}/${nextStep.stepCharID}`)
    //         // })
    //     }

    //     if (char.charID !== 0) {
    //         // console.log('firing update step',)
    //         startUpdateCharInfo({ char })
    //         dispatchNext(takeNextStep(char))
    //         // .then(() => {
    //         //     console.log('firing navigate step',)
    //         //     navigate(`${nextStep.pathRoot}/${nextStep.currentStep}/${nextStep.stepCharID}`)
    //         // })
    //     }
    // }

    // const handleClickBack = () => {
    //     if (char.charID !== 0) {
    //         startUpdateCharInfo({ char })
    //         dispatchNext(prevStep(char))
    //         // .then(() => {
    //         //     navigate(`${nextStep.pathRoot}/${nextStep.currentStep}/${nextStep.stepCharID}`)
    //         // })
    //     }
    // }



    return (
        <div
            className="newC__container"
            id="newC__container"
        >
            <div
                className="newC__spacer"
                id="newC__spacer"
            >
                <Outlet context={[session]} />
                <NewCharFooter
                    session={session}
                />
            </div>
        </div>
    )

}

export default NewCharacter