import React, { useEffect, useReducer, useState } from "react";
import DisplayRational from "../DisplayRational";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../../api/firebase";
import { useOutletContext } from "react-router";
import ClickDescriptionSelect from "../../display/ClickDescriptionSelect";
import { setScrollIDs, updateMaxHP, updateTraitIDs } from "../../../actions/charActions";

const CharTraits = () => {
    const [char, dispatchChar] = useOutletContext();
    const [traits, setTraits] = useState([]);



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

    const extraTraitID = '-NV0g1IzDJD22PtG_g-y';

    // const additionalHPID = '-NV0CzfGuKHy24OMUfMN';
    const toughnessTrait = traits.find(trait => trait.tHP > 0)
    // const armorTraitID = '-NV-zX7BrjyyupnP8Zwc'
    const armorTrait = traits.find(trait => trait.tArmor > 0)
    // const scrollReaderID = '-NV0C_daHy4EQZHergVr';
    const scrollReaderTrait = traits.find(trait => trait.tScroll)


    const handleSelectCheckbox = (tID) => {


        dispatchChar(updateTraitIDs(tID))
        if (tID === toughnessTrait.tID) {
            dispatchChar(updateMaxHP(toughnessTrait.tHP))
        }

        if (tID === armorTrait.tID) {
            dispatchChar(updateMaxHP(armorTrait.tArmor))
        }

        if(tID === scrollReaderTrait.tID){
            dispatchChar(setScrollIDs([]))
        }


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

            <div className="charTraits__text--reminder">
                Click to open
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