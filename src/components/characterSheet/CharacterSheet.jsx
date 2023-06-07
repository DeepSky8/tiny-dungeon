import React, { useEffect, useReducer, useState } from "react";
import { charReducer } from "../../reducers/charReducer";
import useLocalStorageState from "use-local-storage-state";
import { defaultHeritage, heritageReducer } from "../../reducers/heritageReducer";
import { onValue, ref } from "firebase/database";
import { db } from "../../api/firebase";
import { loadHeritage } from "../../actions/heritageActions";
import { defaultTrait, traitReducer } from "../../reducers/traitReducer";
import { loadTrait } from "../../actions/traitActions";
import ClickDescription from "../display/ClickDescription";
import Field from "../display/FieldPencil";
import { updateBelief } from "../../actions/charActions";
import HealthDisplay from "./HealthDisplay";
import ModuleDisplay from "./ModuleDisplay";
import { defaultDisplay, displayReducer } from "../../reducers/displayReducer";
import ModuleHeader from "./ModuleHeader";

const CharacterSheet = () => {
    const [localChar, setLocalChar] = useLocalStorageState('localChar')
    const [char, dispatchChar] = useReducer(charReducer, localChar)
    const [heritage, dispatchHeritage] = useReducer(heritageReducer, defaultHeritage)
    const [hTrait, dispatchHTrait] = useReducer(traitReducer, defaultTrait)
    const [traits, setTraits] = useState([])

    const [show, dispatchShow] = useReducer(displayReducer, defaultDisplay)

    // const [showHealth, setShowHealth] = useState(true)

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


    // Name, Heritage
    // Belief

    // HP, Armor (max and current)
    // Familiar (if exists)
    // Traits (including HTrait)
    // Weapons (includes ranged spell attacks)
    // (optional age, personal description)

    // Trade
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
                    show={show}
                    dispatch={dispatchShow}
                />
                <ModuleDisplay
                    jsx={
                        <HealthDisplay
                            char={char}
                            dispatchChar={dispatchChar}
                        />
                    }
                    visibleState={show.display1}
                />
                <ModuleDisplay
                    jsx={<span>traits</span>}
                    visibleState={show.display2}
                />
                <ModuleDisplay
                    jsx={<span>weapons</span>}
                    visibleState={show.display3}
                />

                {
                    char.familiarID &&
                    <div className="charSheet__familiar">
                        has familiar
                    </div>}
                <div className="charSheet__traits">

                </div>
                <div className="charSheet__weapons">

                </div>
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