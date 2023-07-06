import React, { useEffect, useReducer, useState } from "react";
import DisplayRational from "../DisplayRational";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../../../api/firebase";
import { useOutletContext, useParams } from "react-router";
import ClickDescriptionSelect from "../../display/ClickDescriptionSelect";
import {
    addScroll,
    clearScrolls,
    setCurrentArmor,
    setCurrentHP,
    setMaxArmor,
    dispatchScrolls,
    setTraitHP,
    updateTraitIDs,
    startUpdateTraitHP,
    startUpdateCurrentHP,
    startSetMaxArmor,
    startSetCurrentArmor,
    startClearScrolls,
    startUpdateScrolls,
    loadChar,
    startSetTraitIDs
} from "../../../actions/charActions";
import TapOpen from "../../TapOpen";
import { defaultSession, sessionReducer } from "../../../reducers/sessionReducer";
import { loadSession } from "../../../actions/sessionActions";
import { charReducer, defaultChar } from "../../../reducers/charReducer";
import addScrolls from "../../../functions/addScrolls";
import alphabetizeTitles from "../../../functions/alphabetizeTitles";

const CharTraits = () => {
    const { charID } = useParams()
    // const initialScrolls = 4
    // const initialTraits = 3
    const extraTraitID = '-NV0g1IzDJD22PtG_g-y';

    const [session] = useOutletContext();

    // const [session] = useReducer(sessionReducer, sessionData)
    const [char, dispatchChar] = useReducer(charReducer, defaultChar)
    const [traits, setTraits] = useState([]);
    // const [selectedTraitIDs, setSelectedTraitIDs] = useState([]);
    const [scrolls, setScrolls] = useState([]);


    useEffect(() => {
        if (charID && charID !== 0) {
            console.log('establishing connection',)
            onValue(ref(db, `characters/${charID}`), snapshot => {

                if (
                    snapshot.exists()
                    &&
                    snapshot.val().userID === auth.currentUser.uid
                ) {
                    dispatchChar(loadChar(snapshot.val()))
                }

            })
        }

        return (() => {

            if (charID && charID !== 0) {
                off(ref(db, `characters/${charID}`))
            }
        })
    }, [charID])


    //     useEffect(() => {
    //     onValue(ref(db, `characters/${char.charID}`), snapshot => {
    //         if (snapshot.exists()) {
    //             dispatchChar(loadChar(snapshot.val()))
    //         }
    //     }
    //     // , {
    //     //     onlyOnce: true
    //     // }
    //     )

    //     return (() => {
    //         off(ref(db, `characters/${char.charID}`))
    //     })
    // }, [])

    // useEffect(() => {
    //     onValue(ref(db, `sessionInfo/${char.gameSession}`), snapshot => {
    //         if (snapshot.exists()) {
    //             dispatchSession(loadSession(snapshot.val()))
    //         }
    //     }, {
    //         onlyOnce: true
    //     })

    //     // return (() => {
    //     //     off(ref(db, `sessionInfo/${char.gameSession}`))
    //     // })
    // }, [])

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
                const sortedTraits = alphabetizeTitles({ objectArray: tempArray, titlePrefix: 't' })
                setTraits(sortedTraits)
            }
        }, {
            onlyOnce: true
        })

        // return (() => {
        //     off(ref(db, 'traits'))
        // })
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

        // return (() => {
        //     off(ref(db, 'scrolls'))
        // })
    }, [])


    // useEffect(() => {
    //     if (traits.length > 0) {
    //         const toughnessTrait = traits.find(trait => trait.tHP > 0)
    //         if (char.traitIDs.includes(toughnessTrait.tID)) {
    //             // dispatchChar(setTraitHP(parseInt(toughnessTrait.tHP)))
    //             startUpdateTraitHP({ uid: auth.currentUser.uid, charID: char.charID, tHP: parseInt(toughnessTrait.tHP) })

    //             // dispatchChar(setCurrentHP(parseInt(char.hHP) + parseInt(toughnessTrait.tHP)))
    //             startUpdateCurrentHP({ uid: auth.currentUser.uid, charID: char.charID, currentHP: (parseInt(char.hHP) + parseInt(toughnessTrait.tHP)) })
    //         } else {
    //             // dispatchChar(setTraitHP(0))
    //             startUpdateTraitHP({ uid: auth.currentUser.uid, charID: char.charID, tHP: 0 })

    //             // dispatchChar(setCurrentHP(parseInt(char.hHP)))
    //             startUpdateCurrentHP({ uid: auth.currentUser.uid, charID: char.charID, currentHP: parseInt(char.hHP) })
    //         }

    //         const armorTrait = traits.find(trait => trait.tArmor > 0)
    //         if (char.traitIDs.includes(armorTrait.tID)) {
    //             // dispatchChar(setMaxArmor(parseInt(armorTrait.tArmor)))
    //             startSetMaxArmor({ uid: auth.currentUser.uid, charID: char.charID, maxArmor: parseInt(armorTrait.tArmor) })

    //             // dispatchChar(setCurrentArmor(parseInt(armorTrait.tArmor)))
    //             startSetCurrentArmor({ uid: auth.currentUser.uid, charID: char.charID, currentArmor: parseInt(armorTrait.tArmor) })
    //         } else {
    //             // dispatchChar(setMaxArmor(0))
    //             startSetMaxArmor({ uid: auth.currentUser.uid, charID: char.charID, maxArmor: 0 })

    //             // dispatchChar(setCurrentArmor(0))
    //             startSetCurrentArmor({ uid: auth.currentUser.uid, charID: char.charID, currentArmor: 0 })
    //         }

    //         const scrollReaderTrait = traits.find(trait => trait.tScroll)
    //         // dispatchChar(clearScrolls())
    //         startClearScrolls({ uid: auth.currentUser.uid, charID: char.charID })

    //         if (char.traitIDs.includes(scrollReaderTrait.tID)) {
    //             // If a character has the scroll reader trait
    //             // add all scrolls (with zero count) to the char record

    //             // dispatchChar(dispatchScrolls(scrolls))

    //             const randomScrolls = addScrolls(scrolls, session.initialScrolls)
    //             startUpdateScrolls({ uid: auth.currentUser.uid, charID: char.charID, scrolls: randomScrolls })

    //             // Then increment four scrolls (set by const initialScrolls) by one 
    //             // (this could potentially result in four of the same scroll)
    //             // select a random number from among the number of scrolls, floor it, 
    //             // then use it as an index to add the scroll to the char object


    //             // for (let index = 0; index <= session.initialScrolls; index++) {
    //             //     const randomIndex = Math.floor(Math.random() * scrolls.length)
    //             //     dispatchChar(addScroll(scrolls[randomIndex]))
    //             // }

    //         }
    //     }
    // }, [char.traitIDs])

    const addTraitEffects = (updatedTraitIDs) => {
        const toughnessTrait = traits.find(trait => trait.tHP > 0)
        if (updatedTraitIDs.includes(toughnessTrait.tID)) {
            // dispatchChar(setTraitHP(parseInt(toughnessTrait.tHP)))
            startUpdateTraitHP({ uid: auth.currentUser.uid, charID: char.charID, tHP: parseInt(toughnessTrait.tHP) })

            // dispatchChar(setCurrentHP(parseInt(char.hHP) + parseInt(toughnessTrait.tHP)))
            startUpdateCurrentHP({ uid: auth.currentUser.uid, charID: char.charID, currentHP: (parseInt(char.hHP) + parseInt(toughnessTrait.tHP)) })
        } else {
            // dispatchChar(setTraitHP(0))
            startUpdateTraitHP({ uid: auth.currentUser.uid, charID: char.charID, tHP: 0 })

            // dispatchChar(setCurrentHP(parseInt(char.hHP)))
            startUpdateCurrentHP({ uid: auth.currentUser.uid, charID: char.charID, currentHP: parseInt(char.hHP) })
        }

        const armorTrait = traits.find(trait => trait.tArmor > 0)
        if (updatedTraitIDs.includes(armorTrait.tID)) {
            // dispatchChar(setMaxArmor(parseInt(armorTrait.tArmor)))
            startSetMaxArmor({ uid: auth.currentUser.uid, charID: char.charID, maxArmor: parseInt(armorTrait.tArmor) })

            // dispatchChar(setCurrentArmor(parseInt(armorTrait.tArmor)))
            startSetCurrentArmor({ uid: auth.currentUser.uid, charID: char.charID, currentArmor: parseInt(armorTrait.tArmor) })
        } else {
            // dispatchChar(setMaxArmor(0))
            startSetMaxArmor({ uid: auth.currentUser.uid, charID: char.charID, maxArmor: 0 })

            // dispatchChar(setCurrentArmor(0))
            startSetCurrentArmor({ uid: auth.currentUser.uid, charID: char.charID, currentArmor: 0 })
        }

        const scrollReaderTrait = traits.find(trait => trait.tScroll)
        // dispatchChar(clearScrolls())
        startClearScrolls({ uid: auth.currentUser.uid, charID: char.charID })

        if (updatedTraitIDs.includes(scrollReaderTrait.tID)) {
            // If a character has the scroll reader trait
            // add all scrolls (with zero count) to the char record

            // dispatchChar(dispatchScrolls(scrolls))

            const randomScrolls = addScrolls(scrolls, session.initialScrolls)
            startUpdateScrolls({ uid: auth.currentUser.uid, charID: char.charID, scrolls: randomScrolls })

            // Then increment four scrolls (set by const initialScrolls) by one 
            // (this could potentially result in four of the same scroll)
            // select a random number from among the number of scrolls, floor it, 
            // then use it as an index to add the scroll to the char object


            // for (let index = 0; index <= session.initialScrolls; index++) {
            //     const randomIndex = Math.floor(Math.random() * scrolls.length)
            //     dispatchChar(addScroll(scrolls[randomIndex]))
            // }

        }
    }


    const handleSelectCheckbox = (tID) => {

        const newTraitIDs = (
            (char.traitIDs.includes(tID))
                ?
                (char.traitIDs.filter(traitID => traitID !== tID))
                :
                ([tID].concat(char.traitIDs))
        )

        startSetTraitIDs({ uid: auth.currentUser.uid, charID: char.charID, traitIDs: newTraitIDs })

        addTraitEffects(newTraitIDs)
        
        // const newTraitIDs = (
        //     (selectedTraitIDs.includes(tID))
        //         ?
        //         (selectedTraitIDs.filter(stID => stID !== tID))
        //         :
        //         ([tID].concat(selectedTraitIDs))
        // )
        // setSelectedTraitIDs(newTraitIDs)
        // dispatchChar(updateTraitIDs(tID))

    }

    const traitCalculator = (hTraitID, extraTraitID) => {
        return (hTraitID === extraTraitID ? (session.initialTraits + 1) : session.initialTraits)
    }

    return (
        <div className="charTraits__container">
            <div className="newC__title bold centered">
                Traits
            </div>
            <div className="">
                Select all the traits you'd like to review; they'll cluster here at the top for easy comparison</div>
            {
                char.traitIDs.length > 0
                &&
                <div
                    className="charTraits__selected"
                >
                    <TapOpen />
                    {
                        traits
                            .filter(trait => char.traitIDs.includes(trait.tID))
                            .map(trait => {
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
                            })
                    }

                </div>
            }
            <hr className="hr__brown" />
            <div className="charTraits__container--count">
                <div>
                    {traitCalculator(char.hTraitID, extraTraitID) - char.traitIDs.length} traits available
                </div>
                <div>
                    {char.traitIDs.length} traits selected
                </div>
            </div>

            <TapOpen />
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