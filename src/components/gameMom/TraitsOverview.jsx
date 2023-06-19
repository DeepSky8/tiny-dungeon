import React, { useEffect, useReducer } from "react";
import { counterReducer, defaultCounter } from "../../reducers/counterReducer";
import { addCounterItem, clearCounters } from "../../actions/counterActions";
import ClickDescriptionCount from "../display/ClickDescriptionCount";


const TraitsOverview = ({ characters, traits }) => {
    const [countedTraits, dispatchCountedTraits] = useReducer(counterReducer, defaultCounter)

    useEffect(() => {
        dispatchCountedTraits(clearCounters())

        characters.forEach(character => {
            dispatchCountedTraits(addCounterItem(character.hTraitID))


            character.traitIDs.forEach(traitID => {
                dispatchCountedTraits(addCounterItem(traitID))
            })

        });


    }, [characters, traits])

    return (
        <div className="traitsOverview__container">
            {countedTraits.pairs.map(countedTrait => {
                const thisTrait = traits.find(trait => trait.tID === countedTrait.key)
                return (
                    <ClickDescriptionCount
                        key={countedTrait.key}
                        title={thisTrait.tTitle}
                        description={thisTrait.tDescription}
                        amount={countedTrait.amount}
                        increase={() => { }}
                        decrease={() => { }}
                    />
                )
            })}
        </div>
    )
}

export default TraitsOverview



