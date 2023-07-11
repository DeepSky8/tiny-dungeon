import React, { useEffect, useReducer, useState } from "react";
import { charReducer, defaultChar } from "../../reducers/charReducer";
import useLocalStorageState from "use-local-storage-state";
import { defaultHeritage, heritageReducer } from "../../reducers/heritageReducer";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../../api/firebase";
import { loadHeritage } from "../../actions/heritageActions";
import Field from "../display/FieldPencil";
import { loadChar, startUpdateBelief, updateBelief } from "../../actions/charActions";
import Display from "./Display";
import { useNavigate } from "react-router";

const CharacterSheet = () => {
    let navigate = useNavigate()
    const [localChar, setLocalChar] = useLocalStorageState('localChar')
    const [char, dispatchChar] = useReducer(charReducer, localChar)
    const [heritage, dispatchHeritage] = useReducer(heritageReducer, defaultHeritage)

    useEffect(() => {
        onValue(ref(db, `characters/${char.charID}`), snapshot => {
            if (snapshot.exists()) {
                dispatchChar(loadChar(snapshot.val()))
            } else {
                navigate('/newCharacter/heritage')
            }
        })

        return () => {
            off(ref(db, `characters/${char.charID}`))
        }
    }, [localChar])


    // Get Heritage
    useEffect(() => {
        onValue(ref(db, `heritages/${char.heritageID}`), snapshot => {
            if (snapshot.exists()) {
                dispatchHeritage(loadHeritage(snapshot.val()))
            }
        }
            , {
                onlyOnce: true
            }
        )

        // return (() => {
        //     off(ref(db, `heritages/${char.heritageID}`))
        // })

    }, [])



    return (
        <div className="charSheet__container">
            <div className="charSheet__spacer">
                <div className="charSheet__nameHeritage bold centered">
                    {`${char.charName}, ${heritage.hTitle}`}
                </div>
                <div className="charSheet__belief">
                    <Field
                        label={''}
                        id={'charBelief'}
                        type={'textarea'}
                        value={char.belief}
                        change={(e) => {
                            dispatchChar(updateBelief(e.target.value))
                        }}
                        blur={() => {
                            startUpdateBelief({ uid: auth.currentUser.uid, charData: char })
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
        </div>
    )
}

export default CharacterSheet