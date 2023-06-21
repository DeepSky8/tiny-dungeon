import React, { useEffect, useReducer } from "react";
import { charReducer, defaultChar } from "../../reducers/charReducer";
import useLocalStorageState from "use-local-storage-state";
import { defaultHeritage, heritageReducer } from "../../reducers/heritageReducer";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../../api/firebase";
import { loadHeritage } from "../../actions/heritageActions";
import Field from "../display/FieldPencil";
import { loadChar, startUpdateCharID, updateBelief, updateCharID } from "../../actions/charActions";
import Display from "./Display";
import { startUpdateCharInfo } from "../../actions/charActions";

const CharacterSheet = () => {
    const [localCharID, , { removeItem: removeLocalCharID }] = useLocalStorageState('localCharID')
    const [char, dispatchChar] = useReducer(charReducer, defaultChar)
    const [heritage, dispatchHeritage] = useReducer(heritageReducer, defaultHeritage)

    useEffect(() => {
        console.log('char', char)
    }, [char])

    useEffect(() => {
        if (auth.currentUser) {

            if (localCharID) {
                startUpdateCharID({ uid: auth.currentUser.uid, currentCharID: localCharID });
                removeLocalCharID()
            }


            if (char.charID === 0) {
                onValue(ref(db, `users/${auth.currentUser.uid}/currentCharID`), snapshot => {
                    if (snapshot.exists()) {
                        const tempID = snapshot.val()

                        onValue(ref(db, `characters/` + snapshot.val()), snapshot => {
                            if (snapshot.exists()) {
                                dispatchChar(loadChar(snapshot.val()))
                            } else {
                                dispatchChar(updateCharID(tempID))
                            }

                        }, {
                            onlyOnce: true
                        })
                    }

                })

            } else (
                onValue(ref(db, `characters/` + char.charID), snapshot => {
                    if (snapshot.exists()) {
                        dispatchChar(loadChar(snapshot.val()))
                    }
                }, {
                    onlyOnce: true
                })
            )

        } else {
            if (localCharID) {
                onValue(ref(db, `characters/` + localCharID), snapshot => {
                    if (snapshot.exists()) {
                        dispatchChar(loadChar(snapshot.val()))
                    }
                }, {
                    onlyOnce: true
                })
            }
        }


        return (() => {

            if (localCharID) {
                off(ref(db, `characters/` + localCharID))
            }

            if (auth.currentUser) {
                off(ref(db, `users/${auth.currentUser.uid}`)) // Connection hard-closed on Footer
                off(ref(db, `users/${auth.currentUser.uid}/currentCharID`))
            }
        })
    }, [auth.currentUser])


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

    useEffect(() => {
        startUpdateCharInfo({ char })
    }, [char])

    return (
        <div className="charSheet__container">
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
                            value={char.belief}
                            change={(e) => {
                                dispatchChar(updateBelief(e.target.value))
                            }}
                            blur={() => {
                                startUpdateCharInfo({ char })
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