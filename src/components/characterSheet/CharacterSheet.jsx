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

const CharacterSheet = () => {
    const [localChar, setLocalChar] = useLocalStorageState('localChar')
    const [char, dispatchChar] = useReducer(charReducer, localChar)
    const [heritage, dispatchHeritage] = useReducer(heritageReducer, defaultHeritage)
    const [hTrait, dispatchHTrait] = useReducer(traitReducer, defaultTrait)
    const [traits, setTraits] = useState([])

    const [show1, dispatchShow1] = useReducer(displayReducer, defaultDisplay)
    const [show2, dispatchShow2] = useReducer(displayReducer, defaultDisplay)

    // Spell Reader - trait
    const scrollsTraitID = '-NV0C_daHy4EQZHergVr'

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
        return () => {
            // When unmounting component, save current char to local
            setLocalChar(char)
        }
    }, [])

    const secondaryModule = ['Heritage']

    useEffect(() => {
        if (char.familiarID) {
            secondaryModule.push('Familiar')
        }
        if (char.traitIDs.includes(scrollsTraitID)) {
            secondaryModule.push('Scrolls')
        }
    }, [])



    // Familiar (if exists)

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
                    titleArray={secondaryModule}
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

                {
                    char.familiarID &&
                    <div className="charSheet__familiar">
                        has familiar
                    </div>}

                <div className="charSheet__personal">

                </div>
                <div className="charSheet__trade">

                </div>
                <div className="charSheet__notes">

                </div>
            </div>
        </div>
    )
}

export default CharacterSheet


// <ClickDescription
// show={ }
// dispatch={ }
// displayKey={ }
// closeAction={ }
// openAction={ }
// headerText={ }
// bodyText={ }
// />


// {showHealth &&
//     <div className="charSheet__health">
//         <HealthDisplay
//             char={char}
//             dispatchChar={dispatchChar}
//         />
//     </div>
// }