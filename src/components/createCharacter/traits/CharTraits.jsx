import React, { useEffect, useReducer, useState } from "react";
import DisplayRational from "../DisplayRational";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../../api/firebase";
import { useOutletContext } from "react-router";
import ClickDescriptionSelect from "../../display/ClickDescriptionSelect";
import { updateTraitIDs } from "../../../actions/charActions";

const CharTraits = () => {
    const [char, dispatchChar] = useOutletContext();
    const [traits, setTraits] = useState([]);

    const extraTraitID = '-NV0g1IzDJD22PtG_g-y'

    // Get list of traits
    useEffect(() => {
        onValue(ref(db, 'traits'), snapshot => {
            const tempArray = [];
            if (snapshot.exists()) {
                snapshot.forEach(trait => {
                    if (!trait.val().tHTrait) {
                        tempArray.push(trait.val())
                    }
                })
                setTraits(tempArray)
            }
        }, {
            onlyOnce: true
        })

        return (() => {
            off(ref(db, 'traits'))
        })
    }, [])

    const handleSelectCheckbox = (tID) => {
        dispatchChar(updateTraitIDs(tID))
    }

    const traitCalculator = (hTraitID, extraTraitID) => {
        return (hTraitID === extraTraitID ? 4 : 3)
    }

    return (
        <div className="charTraits__container">
            <div className="charTraits__container--count">
                <div>
                    {traitCalculator(char.hTraitID, extraTraitID) - char.traitIDs.length} traits available
                </div>
                <div>
                    {char.traitIDs.length} traits selected
                </div>
            </div>


            {traits.map(trait => {
                return (
                    <ClickDescriptionSelect
                        key={trait.tID}
                        itemID={trait.tID}
                        title={trait.tTitle}
                        description={trait.tDescription}
                        changeHandler={handleSelectCheckbox}
                        isSelected={char.traitIDs.includes(trait.tID)}
                    />
                )
            })}
            <DisplayRational />
        </div>
    )
}

export default CharTraits