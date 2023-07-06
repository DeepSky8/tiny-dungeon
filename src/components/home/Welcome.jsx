import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Footer from "./Footer";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../../api/firebase";
import returnsURLStub from "../../functions/returnsURLStub";
import { newCharStepOrder } from "../../reducers/nextStepReducer";
import { charReducer, defaultChar } from "../../reducers/charReducer";
import { loadChar } from "../../actions/charActions";

const Welcome = () => {
    const [context] = useOutletContext()
    let navigate = useNavigate();
    const [charCreated, setCharCreated] = useState(false)
    const [tempChar, dispatchTempChar] = useReducer(charReducer, defaultChar)

    useEffect(() => {
        console.log('tempChar', tempChar)
    }, [tempChar])

    useEffect(() => {
        if (context.user.currentCharID) {

            onValue(ref(db, `characters/${context.user.currentCharID}`), snapshot => {
                if (snapshot.exists()) {
                    dispatchTempChar(loadChar(snapshot.val()))

                } else {
                    setCharCreated(false)
                }
            })
        }

        return (() => {
            if (auth.currentUser) {
                off(ref(db, `characters/${context.user.currentCharID}`))
            }
        })
    }, [context.user.currentCharID])

    useEffect(() => {
        const charComplete = (
            returnsURLStub(
                {
                    char: tempChar,
                    newCharStepOrder: newCharStepOrder,
                    currentStep: 'backstory'
                }
            ) === 'end'
        )
        setCharCreated(charComplete)
    }, [tempChar])


    const newCharClick = () => {
        navigate(`/newCharacter/heritage/${tempChar.charID}`)
    }

    const charSheetClick = () => {
        if (charCreated) {
            navigate(`/characterSheet/${tempChar.charID}`)
        }
    }


    return (
        <div className="welcome__container">

            <div className="welcome__container--logo">
                <img
                    className="welcome__logo--image"
                    alt='Tiny Dungeon logo'
                    src="https://firebasestorage.googleapis.com/v0/b/tinydungeon-85b41.appspot.com/o/TinyDungeonLogo.png?alt=media&token=b9381aef-c3ca-4a3f-beb8-4760d4517e46" />
            </div>
            <div className="welcome__container--buttons">
                <div className="welcome__container--button">
                    <div onClick={newCharClick}>
                        <img
                            className="welcome__button"
                            alt='Character Creation button'
                            src="https://firebasestorage.googleapis.com/v0/b/tinydungeon-85b41.appspot.com/o/creation-centered-transparent-brown.png?alt=media&token=153d7de6-f9c6-46c4-bf3b-9abae9923fa5" />
                    </div>
                </div>

                <div className="welcome__container--button">
                    <div onClick={charSheetClick}>
                        <img
                            className={`welcome__button ` + (charCreated ? "" : 'faded')}
                            alt='Character Sheet button'
                            src="https://firebasestorage.googleapis.com/v0/b/tinydungeon-85b41.appspot.com/o/characterSheet-button-transparent-brown.png?alt=media&token=c218b7fe-d13e-4aac-bd14-85258e889be9" />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Welcome

