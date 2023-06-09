import React, { useEffect, useReducer, useState } from "react";
import { charReducer } from "../../reducers/charReducer";
import useLocalStorageState from "use-local-storage-state";
import { defaultHeritage, heritageReducer } from "../../reducers/heritageReducer";
import { onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";
import { loadHeritage } from "../../actions/heritageActions";
import { defaultTrait, traitReducer } from "../../reducers/traitReducer";
import { loadTrait } from "../../actions/traitActions";
import Field from "../display/FieldPencil";
import { updateBelief } from "../../actions/charActions";
import DisplayHealth from "./DisplayHealth";
import ModuleDisplay from "./ModuleDisplay";
import { defaultDisplay, displayReducer } from "../../reducers/displayReducer";
import ModuleHeader from "./ModuleHeader";
import DisplayTraits from "./DisplayTraits";
import DisplayWeapons from "./DisplayWeapons";
import DisplayDescription from "./DisplayDescription";
import DisplayFamiliar from "./DisplayFamilar";
import DisplayScrolls from "./DisplayScrolls";

const CharacterSheet = () => {
    const [localChar, setLocalChar] = useLocalStorageState('localChar')
    const [char, dispatchChar] = useReducer(charReducer, localChar)
    const [heritage, dispatchHeritage] = useReducer(heritageReducer, defaultHeritage)
    const [hTrait, dispatchHTrait] = useReducer(traitReducer, defaultTrait)
    const [traits, setTraits] = useState([])
    const [show1, dispatchShow1] = useReducer(displayReducer, defaultDisplay)
    const [show2, dispatchShow2] = useReducer(displayReducer, defaultDisplay)
    const [menuOptions, setMenuOptions] = useState([])

    // Spell Reader - trait
    const scrollsTraitID = '-NV0C_daHy4EQZHergVr'
    // Familiar - trait
    const hasFamiliarID = '-NV0BAgAYVUBA8OA3_LE'

    useEffect(() => {
        // Get Heritage
        onValue(ref(db, `heritages/${char.heritageID}`), snapshot => {
            if (snapshot.exists()) {
                dispatchHeritage(loadHeritage(snapshot.val()))
            }
        }, {
            onlyOnce: true
        })

        // Get Heritage Trait
        onValue(ref(db, `traits/${char.hTraitID}`), snapshot => {
            if (snapshot.exists()) {
                dispatchHTrait(loadTrait(snapshot.val()))
            }
        }, {
            onlyOnce: true
        })

        // Get Traits
        const tempTraitArray = []
        char.traitIDs.forEach(traitID => {
            onValue(ref(db, `traits/${traitID}`), snapshot => {
                if (snapshot.exists()) {
                    tempTraitArray.push(snapshot.val())
                }
            }, {
                onlyOnce: true
            })
        });
        setTraits(tempTraitArray);

    }, [])


    useEffect(() => {
        setLocalChar(char)

        return () => {
            // When unmounting component, save current char to local
            setLocalChar(char)
        }
    }, [char])

    useEffect(() => {
        const tempArray = []
        if (char.traitIDs.includes(hasFamiliarID)) { tempArray.push('Familiar') }
        if (char.traitIDs.includes(scrollsTraitID)) { tempArray.push('Scrolls') }
        setMenuOptions(tempArray)
    }, [])

    // Notes

    return (
        <div className="charSheet__container">
            <div className="charSheet__spacer">
                <div className="charSheet__nameHeritage">
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
                            setLocalChar(char)
                        }}
                        theme={'italic'}
                        placeholder={char.charName + "'s belief"}
                    />
                </div>

                <ModuleHeader
                    titleArray={['Health', 'Traits', 'Weapons']}
                    show={show1}
                    dispatch={dispatchShow1}
                />
                <ModuleDisplay
                    jsx={
                        <DisplayHealth
                            char={char}
                            dispatchChar={dispatchChar}
                        />
                    }
                    visibleState={show1.display1}
                />
                <ModuleDisplay
                    jsx={
                        <DisplayTraits
                            heritageTrait={hTrait}
                            traits={traits} />
                    }
                    visibleState={show1.display2}
                />
                <ModuleDisplay
                    jsx={
                        <DisplayWeapons
                            char={char}
                            dispatchChar={dispatchChar}
                        />
                    }
                    visibleState={show1.display3}
                />

                <ModuleHeader
                    titleArray={['Heritage'].concat(menuOptions)}
                    show={show2}
                    dispatch={dispatchShow2}
                />


                <ModuleDisplay
                    jsx={
                        <DisplayDescription
                            char={char}
                            dispatchChar={dispatchChar}
                            heritage={heritage}
                        />
                    }
                    visibleState={show2.display1}
                />

                <ModuleDisplay
                    jsx={
                        <DisplayFamiliar
                            char={char}
                            dispatchChar={dispatchChar}
                        />
                    }
                    visibleState={show2.display2}
                />

                <ModuleDisplay
                    jsx={
                        <DisplayScrolls
                            scrolls={char.scrolls}
                            dispatchChar={dispatchChar}
                        />
                    }
                    visibleState={show2.display3}
                />

                <div className="charSheet__notes">

                </div>
            </div>
        </div>
    )
}

export default CharacterSheet