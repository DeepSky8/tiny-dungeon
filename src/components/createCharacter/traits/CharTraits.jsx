import React, { useEffect, useReducer, useState } from "react";
import DisplayRational from "../DisplayRational";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../../api/firebase";
import { useOutletContext } from "react-router";
import ClickDescriptionSelect from "../../display/ClickDescriptionSelect";
import { addScroll, clearScrolls, setCurrentArmor, setCurrentHP, setMaxArmor, setTraitHP, updateTraitIDs } from "../../../actions/charActions";

const CharTraits = () => {
    const initialScrolls = 4

    const [char, dispatchChar] = useOutletContext();
    const [traits, setTraits] = useState([]);
    const [scrolls, setScrolls] = useState([]);

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

    useEffect(() => {
        onValue(ref(db, 'scrolls'), snapshot => {
            const tempArray = [];
            if (snapshot.exists()) {
                snapshot.forEach(scroll => {
                    tempArray.push(scroll.val())
                })
                setScrolls(tempArray)
            }
        }, {
            onlyOnce: true
        })

        return (() => {
            off(ref(db, 'scrolls'))
        })
    }, [])

    const extraTraitID = '-NV0g1IzDJD22PtG_g-y';

    useEffect(() => {
        if (traits.length > 0) {
            // const additionalHPID = '-NV0CzfGuKHy24OMUfMN';
            const toughnessTrait = traits.find(trait => trait.tHP > 0)
            if (char.traitIDs.includes(toughnessTrait.tID)) {
                dispatchChar(setTraitHP(parseInt(toughnessTrait.tHP)))
                dispatchChar(setCurrentHP(parseInt(char.hHP) + parseInt(toughnessTrait.tHP)))
            } else {
                dispatchChar(setTraitHP(0))
                dispatchChar(setCurrentHP(parseInt(char.hHP)))
            }


            // const armorTraitID = '-NV-zX7BrjyyupnP8Zwc'
            const armorTrait = traits.find(trait => trait.tArmor > 0)
            if (char.traitIDs.includes(armorTrait.tID)) {
                dispatchChar(setMaxArmor(parseInt(armorTrait.tArmor)))
                dispatchChar(setCurrentArmor(parseInt(armorTrait.tArmor)))
            } else {
                dispatchChar(setMaxArmor(0))
                dispatchChar(setCurrentArmor(0))
            }


            // const scrollReaderID = '-NV0C_daHy4EQZHergVr';
            const scrollReaderTrait = traits.find(trait => trait.tScroll)
            dispatchChar(clearScrolls())
            if (char.traitIDs.includes(scrollReaderTrait.tID)) {
                // If a character has the scroll reader trait
                // They start with four scrolls (set by const initialScrolls)
                // While they have fewer than four scrolls, 
                // select a random number from among the number of scrolls, floor it, 
                // then use it as an index to add the scroll to the char object
                for (let index = 0; index < initialScrolls; index++) {
                    const randomIndex = Math.floor(Math.random() * scrolls.length)
                    dispatchChar(addScroll(scrolls[randomIndex]))
                }
            }
        }
    }, [char.traitIDs])


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