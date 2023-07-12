import React, { useEffect, useState } from "react";
import { defaultDisplay, displayReducer } from "../../reducers/displayReducer";
import ModuleDisplay from "./ModuleDisplay";
import { useReducer } from "react";
import DisplayDescription from "./DisplayDescription";
import DisplayHealth from "./DisplayHealth";
import DisplayTraits from "./DisplayTraits";
import DisplayWeapons from "./DisplayWeapons";
import DisplayFamiliar from "./DisplayFamilar";
import DisplayScrolls from "./DisplayScrolls";
import CombatActions from "./CombatActions";
import addDisplayActions from "../../functions/addDisplayActions";
import { defaultHeritage, heritageReducer } from "../../reducers/heritageReducer";
import { defaultTrait, traitReducer } from "../../reducers/traitReducer";
import { onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";
import { loadHeritage } from "../../actions/heritageActions";
import { loadTrait } from "../../actions/traitActions";
import DisplayNotes from "./DisplayNotes";

// Spell Reader - trait
const scrollsTraitID = '-NV0C_daHy4EQZHergVr'
// Familiar - trait
const hasFamiliarID = '-NV0BAgAYVUBA8OA3_LE'

const Display = ({ char, dispatchChar, fadeArray = [], maxPerRow = 3, theme = '' }) => {
    const [show, dispatchShow] = useReducer(displayReducer, defaultDisplay)
    const [heritage, dispatchHeritage] = useReducer(heritageReducer, defaultHeritage)
    const [hTrait, dispatchHTrait] = useReducer(traitReducer, defaultTrait)
    const [traits, setTraits] = useState([])



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

    // Get Heritage Trait
    useEffect(() => {
        onValue(ref(db, `traits/${char.hTraitID}`), snapshot => {
            if (snapshot.exists()) {
                dispatchHTrait(loadTrait(snapshot.val()))
            }
        }
            , {
                onlyOnce: true
            }
        )

        // return (() => {
        //     off(ref(db, `traits/${char.hTraitID}`))
        // })

    }, [])

    // Get Traits
    useEffect(() => {
        const tempTraitArray = []
        char.traitIDs.forEach(traitID => {
            onValue(ref(db, `traits/${traitID}`), snapshot => {
                if (snapshot.exists()) {
                    tempTraitArray.push(snapshot.val())
                }
            }
                , {
                    onlyOnce: true
                }
            )
        });
        setTraits(tempTraitArray);

        // return (() => {
        //     char.traitIDs.forEach(traitID => {
        //         off(ref(db, `traits/${traitID}`))
        //     });
        // })

    }, [])


    const protoMenuObjects = [
        {
            title: 'Heritage',
            display: <DisplayDescription
                char={char}
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
                traits={traits}
            />,
            traitID: '',
        },
        {
            title: 'Familiar',
            display: <DisplayFamiliar char={char} />,
            traitID: hasFamiliarID,
        },
        {
            title: 'Weapons',
            display: <DisplayWeapons char={char} />,
            traitID: '',
        },
        {
            title: 'Scrolls',
            display: <DisplayScrolls char={char} />,
            traitID: scrollsTraitID,
        },
        {
            title: 'Actions',
            display: <CombatActions />,
            traitID: '',
        },
        {
            title: 'Notes',
            display: <DisplayNotes char={char} />,
            traitID: '',
        },
    ]

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

    const menuObjects = addDisplayActions(tempArray)

    const splitMenuObjects = []

    if (menuObjects.length > maxPerRow) {
        for (let index = 0; index < menuObjects.length; index += maxPerRow) {
            const row = menuObjects.slice(index, index + maxPerRow)
            splitMenuObjects.push(row)
        }
    } else {
        splitMenuObjects.push(menuObjects)
    }

    const accessible = (object) => {
        return !fadeArray.includes(object.title)
    }

    return (
        <div className="display__container">
            {
                splitMenuObjects.map(objectRow => {
                    const spacing = objectRow.length === maxPerRow ? 'space-between' : 'space-around'
                    return (
                        <div
                            key={Math.random()}
                            className={`display__row ${spacing}`}
                        >
                            {
                                objectRow.map(object => {
                                    return (
                                        <span
                                            key={object.displayKey}
                                            className={(accessible(object) ? '' : 'fade') + `${theme} display__button ` + show[`${object.displayKey}`]}
                                            onClick={() => {
                                                if (accessible(object)) {
                                                    show[object.displayKey] ?
                                                        dispatchShow(object.close())
                                                        :
                                                        dispatchShow(object.open())
                                                }
                                            }}>{object.title}</span>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            <hr className="hr__brown" />

            {
                menuObjects.map(object => {
                    return (
                        <ModuleDisplay
                            key={object.displayKey}
                            jsx={object.display}
                            visibleState={show[`${object.displayKey}`]}
                        />

                    )
                })
            }

        </div>
    )
}

export default Display