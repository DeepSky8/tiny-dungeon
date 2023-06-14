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
import DisplayDescription from "./DisplayDescription";
import DisplayHealth from "./DisplayHealth";
import DisplayTraits from "./DisplayTraits";
import DisplayWeapons from "./DisplayWeapons";
import DisplayFamiliar from "./DisplayFamilar";
import DisplayScrolls from "./DisplayScrolls";
import CombatActions from "./CombatActions";
import addDisplayActions from "../../functions/addDisplayActions";
import Display from "./Display";

const CharacterSheet = () => {
    const [localChar, setLocalChar] = useLocalStorageState('localChar')
    const [char, dispatchChar] = useReducer(charReducer, localChar)
    const [heritage, dispatchHeritage] = useReducer(heritageReducer, defaultHeritage)
    const [hTrait, dispatchHTrait] = useReducer(traitReducer, defaultTrait)
    const [traits, setTraits] = useState([])
    const [menuObjects, setMenuObjects] = useState([])

    // Spell Reader - trait
    const scrollsTraitID = '-NV0C_daHy4EQZHergVr'
    // Familiar - trait
    const hasFamiliarID = '-NV0BAgAYVUBA8OA3_LE'

    const protoMenuObjects = [
        {
            title: 'Heritage',
            display: <DisplayDescription
                char={char}
                dispatchChar={dispatchChar}
                heritage={heritage}
            />,
            traitID: '',
        },
        {
            title: 'Health',
            display: <DisplayHealth
                char={char}
                dispatchChar={dispatchChar}
            />,
            traitID: '',
        },
        {
            title: 'Traits',
            display: <DisplayTraits
                heritageTrait={hTrait}
                traits={traits} />,
            traitID: '',
        },
        {
            title: 'Familiar',
            display: <DisplayFamiliar
                char={char}
                dispatchChar={dispatchChar}
            />,
            traitID: hasFamiliarID,
        },
        {
            title: 'Scrolls',
            display: <DisplayScrolls
                scrolls={char.scrolls}
                dispatchChar={dispatchChar}
            />,
            traitID: scrollsTraitID,
        },
        {
            title: 'Combat',
            display: <CombatActions />,
            traitID: '',
        },
        {
            title: 'Weapons',
            display: <DisplayWeapons
                char={char}
                dispatchChar={dispatchChar}
            />,
            traitID: '',
        },

    ]

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

        protoMenuObjects.forEach(object => {
            if (
                (object.traitID === '')
                ||
                (char.traitIDs.includes(object.traitID))
            ) {
                tempArray.push(object)
            }
        })
        setMenuObjects(tempArray)
    }, [])

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

                <Display
                    menuObjects={addDisplayActions(menuObjects)}
                />
            </div>
        </div>
    )
}

export default CharacterSheet