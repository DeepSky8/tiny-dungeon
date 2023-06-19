import React, { useEffect, useState } from "react";
import { auth, db } from "../../api/firebase";
import { off, onValue, ref } from "firebase/database";
import ClickDescriptionMultiple from "../display/ClickDescriptionMultiple";
import ClickDescriptionCount from "../display/ClickDescriptionCount";


const CharacterSummary = ({ charData }) => {
    const [heritage, setHeritage] = useState([])
    const [traits, setTraits] = useState([])
    // const heritage = heritageData.find(heritage => heritage.hID === charData.heritageID)
    // const hTrait = traitData.filter(trait => charData.hTraitID.includes(trait.tID))
    // const traits = traitData.filter(trait => charData.traitIDs.includes(trait.tID))



    useEffect(() => {
        onValue(ref(db, 'heritages'), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => tempArray.push(snap.val()))
            }
            const thisHeritage = tempArray.find(heritage => heritage.hID === charData.heritageID)
            if (thisHeritage) { setHeritage(thisHeritage) }
        })

        return (() => {
            off(ref(db, 'heritages'))
        })
    }, [])

    useEffect(() => {
        onValue(ref(db, 'traits'), snapshot => {
            const tempArray = []
            if (snapshot.exists()) {
                snapshot.forEach(snap => {
                    tempArray.push(snap.val())
                })
                const hTrait = tempArray.filter(trait => charData.hTraitID.includes(trait.tID))
                const regTraits = tempArray.filter(trait => charData.traitIDs.includes(trait.tID))
                console.log('hTrait', hTrait)
                console.log('regTraits', regTraits)
                setTraits(hTrait.concat(regTraits))
            }
        })

        return (() => {
            off(ref(db, 'traits'))
        })
    }, [])


    return (
        <div className="characterSummary__container">

            <div className="charSum__body">
                <div className="italic centered">{charData.belief}</div>
                <div className="charSum__line">
                    <div>{heritage.hTitle}</div>
                    {
                        traits.map(trait => trait.tFamiliar).includes(true)
                        &&
                        <div>Has Familiar</div>
                    }
                </div>
                <div className="charSum__line">
                    <div>{`Armor: ${charData.currentArmor}`}</div>
                    <div>{`Health: ${charData.currentHP}`}</div>
                </div>

                <div>
                    {traits.map(trait => {
                        return (
                            <ClickDescriptionMultiple
                                key={trait.tID}
                                title={trait.tTitle}
                                description={trait.tDescription}
                            />
                        )
                    })}
                </div>
                <hr className="hr__brown" />

                <div>
                    {charData.weaponObjects.map(weapon => {
                        return (
                            <ClickDescriptionMultiple
                                key={Math.random()}
                                title={weapon.wTitle}
                                description={weapon.wDescription}
                            />
                        )
                    })}
                </div>
                <hr className="hr__brown" />

                {
                    traits.map(trait => trait.tScroll).includes(true)
                    &&
                    <div>
                        {charData.scrolls.map(scroll => {
                            return (
                                <ClickDescriptionCount
                                    key={scroll.sID}
                                    title={scroll.sTitle}
                                    description={scroll.sDescription}
                                    amount={scroll.sAmount}
                                    increase={() => { }}
                                    decrease={() => { }}
                                />
                            )
                        })}
                    </div>
                }


            </div>

            <hr className="hr__brown" />

        </div>
    )
}

export default CharacterSummary

// Belief
// Heritage
// Health/Armor
// Traits
// Weapons
// has familiar
// Scrolls