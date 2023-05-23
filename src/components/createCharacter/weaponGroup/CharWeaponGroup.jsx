import React, { useEffect, useReducer, useState } from "react";
import { useOutletContext } from "react-router";
import { clearWeaponGroupIDs, addRemoveWeaponGroupID } from "../../../actions/charActions";
import sortWGs from "../../../functions/sortWGs";
import ClickDescription from "../../display/ClickDescription";
import { defaultDisplay, displayReducer } from "../../../reducers/displayReducer";
import ClickDescriptionSelect from "../../display/ClickDescriptionSelect";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../../api/firebase";
import DisplayRational from "../DisplayRational";


// // Bow Mastery - Heritage Trait
// const bowMasteryID = '-NV0g5_XAfqCb0Y9079M';
// // Powerful Claws - Heritage Trait
// const karhuClawID = '-NV0jYp3gMM1_J07zoU2';

// // Armor Master - trait
// const armorTraitID = '-NV-zX7BrjyyupnP8Zwc';
// // Barfighter - trait
// const improvisedWeaponGroup = '-NV03ETlxlqgMs5vFCrO';
// // Familiar - trait
// const hasFamiliar = '-NV0BAgAYVUBA8OA3_LE';
// // Martial Artist - trait
// const unarmedWeaponGroup = '-NV0Bbp1XgrfyHr7nha-';
// // Shield Bearer
// const shield = '-NV0C_daHy4EQZHergVr';
// // Spell Reader - trait
// const scrolls = '-NV0C_daHy4EQZHergVr';
// // Spell-Touched
// const spells = '-NV0Cozs0xp32U7L7cx8';
// // Tough - trait
// const additionalHP = '-NV0CzfGuKHy24OMUfMN';


// const weaponGroups = {
//     // Light - l
//     light: '-NV6VaDJd7zza5i0UR9z',
//     // Heavy - h
//     heavy: '-NV6XSrebaRiCHw-FfI1',
//     // Ranged - r
//     ranged: '-NV6Xo0B7lwELzzOnYkm',
//     // Improvised - i
//     improvised: '-NV6YTDUDqbxgKFzc47H',
//     // Unarmed - u
//     unarmed: '-NV6Yyve_GUxV4OsizI2',
//     // Shields - s
//     shield: '-NV6ZmJQi2ryBeRC_lv2',
// }


const CharWeaponGroup = () => {
    const [char, dispatchChar] = useOutletContext();
    const charTraitIDs = [char.hTraitID].concat(char.traitIDs)
    const [selectedTraits, setSelectedTraits] = useState([])
    const [allWeaponGroups, setAllWeaponGroups] = useState([])
    const [defaultWeaponGroups, setDefaultWeaponGroups] = useState([]);
    const [availWeaponGroups, setAvailWeaponGroups] = useState([]);
    const [selectedWGID, setSelectedWGID] = useState('')

    // Get trait objects
    useEffect(() => {
        const tempArray = [];

        charTraitIDs.forEach(traitID => {
            onValue(ref(db, `traits/${traitID}`), snapshot => {
                if (snapshot.exists()) {
                    tempArray.push(snapshot.val())
                }
            }, {
                onlyOnce: true
            })
        })

        setSelectedTraits(tempArray)
        // return (() => {
        //     off(ref(db, 'weaponGroups'))
        // })
    }, [])

    // Get list of Weapon Groups
    useEffect(() => {
        onValue(ref(db, 'weaponGroups'), snapshot => {
            const tempArray = [];
            if (snapshot.exists()) {
                snapshot.forEach(weaponGroup => {
                    tempArray.push(weaponGroup.val())
                })
                setAllWeaponGroups(tempArray)
            }
        }, {
            onlyOnce: true
        })

        return (() => {
            off(ref(db, 'weaponGroups'))
        })
    }, [])

    // Clear weapon group IDs on char
    // then use sortedWGs to evaluate weapon groups gained via trait
    // Add those weapon groups to char,
    // then provide the remaining weapon groups to the user to select one
    useEffect(() => {
        dispatchChar(clearWeaponGroupIDs())
        if (selectedTraits.length > 0 && allWeaponGroups.length > 0) {
            const sortedWGs = sortWGs(
                {
                    allTraits: selectedTraits,
                    weaponGroups: allWeaponGroups
                }
            )
            setDefaultWeaponGroups(sortedWGs.defaultWGs);
            sortedWGs
                .defaultWGs
                .forEach(wg => {
                    dispatchChar(addRemoveWeaponGroupID(wg.wgID))
                })

            setAvailWeaponGroups(sortedWGs.availWGs);
        }

    }, [selectedTraits, allWeaponGroups])

    const handleWGSelection = (wgID) => {
        console.log('selectedWGID', selectedWGID)
        // If an available weapon group was selected
        // remove it from the char object
        if (selectedWGID) {
            dispatchChar(addRemoveWeaponGroupID(selectedWGID))
        }

        if (wgID === selectedWGID) {
            setSelectedWGID('')
        } else {
            // Set the new weapon group in temporary storage
            setSelectedWGID(wgID)
            // and 
            dispatchChar(addRemoveWeaponGroupID(wgID))

        }


    }

    // useEffect(() => {
    //     console.log('defaultWeaponGroups', defaultWeaponGroups)
    // }, [defaultWeaponGroups])

    // Need to evaluate what weapon groups are provided by hTraitIDs and regular traits,
    // Powerful Claws prevents Ranged wg, and adds Unarmed wg
    // The rest of these add the wg, and allow selecting an additional wg
    // Bow Mastery adds Ranged wg
    // Barfighter adds Improvised Weapons to the wg list
    // Martial Artist adds Unarmed to the wg list
    // Shield Bearer adds Shield to the wg list
    // Spell-Touched adds Ranged to the wg list

    return (
        <div className="charWeaponGroup__container">

            {
                defaultWeaponGroups.length > 0
                &&
                <div className="charWeaponGroup__container--defaultWGs">
                    <div className="charWeaponGroup__text--explanation">
                        Your character can use the following weapon groups due to trait selection:
                    </div>
                    <div className="charWeaponGroup__text--reminder">
                        Click to open
                    </div>
                    {defaultWeaponGroups.map(wg => {
                        return (
                            <ClickDescriptionSelect
                                key={wg.wgID}
                                itemID={wg.wgID}
                                title={wg.wgTitle}
                                description={wg.wgDescription}
                                changeHandler={() => {
                                    // Cannot be unselected
                                }}
                                isSelected={true}
                            />
                        )
                    })}
                </div>
            }

            {
                availWeaponGroups.length > 0
                &&
                <div className="charWeaponGroup__container--availWGs">
                    <div className="charWeaponGroup__text--explanation">
                        The following Weapon Groups are available for your character:
                    </div>
                    <div className="charWeaponGroup__text--reminder">
                        Click to open
                    </div>
                    {availWeaponGroups.map(wg => {
                        return (
                            <ClickDescriptionSelect
                                key={wg.wgID}
                                itemID={wg.wgID}
                                title={wg.wgTitle}
                                description={wg.wgDescription}
                                changeHandler={() => {
                                    handleWGSelection(wg.wgID)
                                }}
                                isSelected={char.weaponGroupIDs.includes(wg.wgID)}
                            />
                        )
                    })}
                </div>
            }


            <DisplayRational />

        </div>
    )
}

export default CharWeaponGroup