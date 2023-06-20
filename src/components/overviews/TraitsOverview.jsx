import React, { useEffect, useReducer } from "react";
import { counterReducer, defaultCounter } from "../../reducers/counterReducer";
import { addCounterItem, clearCounters } from "../../actions/counterActions";
import ClickDescriptionCount from "../display/ClickDescriptionCount";
import alphabetizeKeys from "../../functions/alphabetizeKeys";


const TraitsOverview = ({ characters, traits }) => {
    const [countedTraits, dispatchCountedTraits] = useReducer(counterReducer, defaultCounter)

    useEffect(() => {
        dispatchCountedTraits(clearCounters())

        characters.forEach(character => {
            dispatchCountedTraits(addCounterItem({ key: character.hTraitID, title: traits.find(trait => trait.tID === character.hTraitID).tTitle }))


            character.traitIDs.forEach(traitID => {
                dispatchCountedTraits(addCounterItem({ key: traitID, title: traits.find(trait => trait.tID === traitID).tTitle }))
            })

        });


    }, [characters, traits])

    return (
        <div className="traitsOverview__container">
            {alphabetizeKeys({ objectArray: countedTraits.pairs, key: 'title' }).map(countedTrait => {
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



