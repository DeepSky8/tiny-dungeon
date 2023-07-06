import React, { useEffect, useReducer, useState } from "react";
import { charReducer, defaultChar } from "../../reducers/charReducer";
// import useLocalStorageState from "use-local-storage-state";
import { defaultHeritage, heritageReducer } from "../../reducers/heritageReducer";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../../api/firebase";
import { loadHeritage } from "../../actions/heritageActions";
import Field from "../display/FieldPencil";
import { loadChar, startUpdateBelief, startUpdateCharID, updateBelief, updateCharID } from "../../actions/charActions";
import Display from "./Display";
import { useOutletContext, useParams } from "react-router";
import { Link } from "react-router-dom";

const CharacterSheet = () => {
    const { charID } = useParams()
    const [user] = useOutletContext();
    const [heritage, dispatchHeritage] = useReducer(heritageReducer, defaultHeritage)
    const [char, dispatchChar] = useReducer(charReducer, defaultChar)
    const [belief, setBelief] = useState('')

    // useEffect(() => {
    //     console.log('char', char)
    // }, [char])

    // useEffect(() => {
    //     console.log('user', user)
    // }, [user])

    useEffect(() => {
        if (charID) {
            onValue(ref(db, `characters/${charID}`), snapshot => {
                if (snapshot.exists()) {
                    dispatchChar(loadChar(snapshot.val()))
                    setBelief(snapshot.val().belief)
                }
            })
        }

        return (() => {
            if (charID) {
                off(ref(db, `characters/${charID}`))
            }
        })
    }, [charID])

    // Get Heritage
    useEffect(() => {
        if (char.heritageID) {
            onValue(ref(db, `heritages/${char.heritageID}`), snapshot => {
                if (snapshot.exists()) {
                    dispatchHeritage(loadHeritage(snapshot.val()))
                }
            }, {
                onlyOnce: true
            })
        }

        // return (() => {
        //     off(ref(db, `heritages/${char.heritageID}`))
        // })

    }, [char])

    // useEffect(() => {
    //     startUpdateCharInfo({ char })
    // }, [char])

    return (
        <div className="charSheet__container">
            {
                (char.charID === 0 || charID === '')
                &&
                <div className="charSheet__noCharacter">
                    <Link
                        className="brown noUnderline"
                        to={'/newCharacter/heritage'}>
                        <div>Please</div>
                        <div>click here</div>
                        <div>to create</div>
                        <div>a character</div>
                    </Link>
                </div>
            }
            {
                char.charName &&
                heritage.hTitle &&
                <div className="charSheet__spacer">
                    <div className="charSheet__nameHeritage bold centered">
                        {`${char.charName}, ${heritage.hTitle}`}
                    </div>
                    <div className="charSheet__belief">
                        <Field
                            label={''}
                            id={'charBelief'}
                            type={'textarea'}
                            value={belief}
                            change={(e) => {
                                // dispatchChar(updateBelief(e.target.value))
                                setBelief(e.target.value)
                            }}
                            blur={() => {
                                startUpdateBelief({ uid: auth.currentUser.uid, charID: char.charID, belief })
                                // startUpdateCharInfo({ char })
                            }}
                            theme={'italic'}
                            placeholder={char.charName + "'s belief"}
                        />
                    </div>

                    <Display
                        char={char}
                        dispatchChar={dispatchChar}
                    />
                </div>
            }

        </div>
    )
}

export default CharacterSheet