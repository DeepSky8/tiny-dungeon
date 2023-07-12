import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import Footer from "./Footer";
import { auth, db } from "../../api/firebase";
import { off, onValue, ref } from "firebase/database";
import { defaultChar } from "../../reducers/charReducer";

const Welcome = () => {
    let navigate = useNavigate();
    const [localUser] = useLocalStorageState('localUser')
    const [localChar, setLocalChar] = useLocalStorageState('localChar', { defaultValue: defaultChar })

    const [sessionCode,] = useLocalStorageState('sessionCode')
    const [charCreated, setCharCreated] = useState(false)
    // const [authStatus, setAuthStatus] = useState(auth.currentUser ? 'lock_open' : 'lock')

    useEffect(() => {
        if (localUser.charID) {
            onValue(ref(db, `characters/${localUser.charID}`), snapshot => {
                if (snapshot.exists()) {
                    setLocalChar({ ...snapshot.val(), userID: "" })
                }
            })
        }

        return () => {
            if (localUser.charID) {
                off(ref(db, `characters/${localUser.charID}`))
            }
        }
    }, [localUser])



    useEffect(() => {
        if (
            (localChar !== undefined)
            &&
            (localChar.charName.length > 0 && localChar.trade.length > 0 & localChar.belief.length > 0)
        ) {
            setCharCreated(true)
        } else {
            setCharCreated(false)
        }
    }, [localChar])

    const newCharClick = () => {
        if (sessionCode) {
            navigate('/newCharacter/heritage')
        } else {
            navigate('/authenticate/(newCharacter(heritage')
        }
    }

    const charSheetClick = () => {
        if (sessionCode) {
            if (
                (localChar !== undefined)
                &&
                (localChar.charName.length > 0 && localChar.trade.length > 0 & localChar.belief.length > 0)
            ) {
                navigate('/characterSheet')
            } else {
                navigate('/newCharacter/heritage')
            }
        } else if (localChar) {
            navigate('/authenticate/(characterSheet')
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

