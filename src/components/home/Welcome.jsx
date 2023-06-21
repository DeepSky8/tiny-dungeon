import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import Footer from "./Footer";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../../api/firebase";
import { defaultUserState, userReducer } from "../../reducers/userReducer";
import { loadUser } from "../../actions/userActions";

const Welcome = () => {
    let navigate = useNavigate();
    const [localChar, , { removeItem: removeLocalChar }] = useLocalStorageState('localChar')
    const [localCode, , { removeItem: removeLocalCode }] = useLocalStorageState('localCode')
    const [charCreated, setCharCreated] = useState(false)
    // const [user, dispatchUser] = useReducer(userReducer, defaultUserState)

    // useEffect(() => {
    //     console.log('user', user)
    //     console.log('auth', auth.currentUser)
    // }, [user])

    useEffect(() => {
        if (auth.currentUser) {

            onValue(ref(db, `users/${auth.currentUser.uid}/currentCharID`), snapshot => {
                if (snapshot.exists()) {
                    setCharCreated(true)
                } else {
                    setCharCreated(false)
                }
            })
        }

        return (() => {
            if (auth.currentUser) {
                off(ref(db, `users/${auth.currentUser.uid}/currentCharID`))
            }
        })
    }, [auth.currentUser])

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
        navigate('/newCharacter/heritage')
    }

    const charSheetClick = () => {
        if (charCreated) {
            navigate('/characterSheet')
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

