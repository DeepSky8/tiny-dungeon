import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import DisplayRational from "../DisplayRational";
import DisplayWeapon from "./DisplayWeapon";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../../api/firebase";
import returnsWeaponTitleText from "../../../functions/returnsWeaponTitleText";
import DisplayUnarmed from "./DisplayUnarmed";
import returnsUnarmedTitleText from "../../../functions/returnsUnarmedTitleText";
import DisplayMagicRanged from "./DisplayMagicRanged";
import alphabetizeWeapons from "../../../functions/alphabetizeWeapons";


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




const CharWeapon = () => {
    const [char, dispatchChar] = useOutletContext()
    // const selectedWGIDs = char.weaponGroupIDs
    const [weaponGroups, setWeaponGroups] = useState([])
    const [weapons, setWeapons] = useState([])



    // Get Weapon Group object per selected Weapon Group ID
    useEffect(() => {
        let tempArray = [];

        char.weaponGroupObjects.forEach(wgIDO => {
            onValue(ref(db, `weaponGroups/${wgIDO.wgID}`), snapshot => {
                if (snapshot.exists()) {
                    tempArray.push(snapshot.val())
                }
            }, {
                onlyOnce: true
            })
        });

        setWeaponGroups(tempArray)

        // onValue(ref(db, `weaponGroups`), snapshot => {
        //     const tempArray = [];
        //     if (snapshot.exists()) {
        //         snapshot.forEach(snap => {
        //             if (
        //                 (
        //                     char.weaponGroupIDs.includes(snap.val().wgID)
        //                 )
        //                 // &&
        //                 // (
        //                 //     snap.val().wgID !== '-NV6Yyve_GUxV4OsizI2' // Unarmed weapon group does not create a weapon
        //                 // )
        //             ) {
        //                 tempArray.push(snap.val())
        //             }
        //         })
        //     }
        //     // const tempFiltered = tempArray.filter(wg => char.weaponGroupIDs.includes(wg.wgID))
        //     setWeaponGroups(tempArray)
        // }, {
        //     onlyOnce: true
        // })

        // return (() => {
        //     off(ref(db, `weaponGroups`))
        // })

    }, [])

    // Get all Weapons
    useEffect(() => {
        onValue(ref(db, 'weapons'), snapshot => {
            const tempArray = [];
            if (snapshot.exists()) {
                snapshot.forEach(weapon => {
                    tempArray.push(weapon.val())
                })
            }
            const sortedWeapons = tempArray.length > 0 ? alphabetizeWeapons({ weapons: tempArray }) : tempArray
            setWeapons(sortedWeapons)
        }, {
            onlyOnce: true
        })

        // return (() => {
        //     off(ref(db, 'weapons'))
        // })
    }, [])

    // For each (appropriate) weapon group, allow the user
    // to create/define a weapon in that group
    // Display weapon group traits as part of the weapon
    // This includes range, damage, number of attacks per turn

    return (
        <div className="charWeapon__container">
            <div
                className="charWeapon__text"
                id="charWeapon__text"
            >

                {
                    weaponGroups.filter(wg => wg.wgType !== 'u' && wg.wgType !== 'm').length > 0
                    &&
                    <span>Your character is proficient with {returnsWeaponTitleText({ array: weaponGroups, titlePrefix: 'wg', removeArray: ['Unarmed', 'Magical Ranged'] })} weapons</span>

                }

            </div>
            <div className="clickOpen__text--reminder">
                Click to open
            </div>
            {
                weaponGroups.length > 0
                &&
                weapons.length > 0
                &&
                <span>

                    {
                        weaponGroups.map(wg => {
                            const jsx = (
                                (wg.wgType !== 'u' && wg.wgType !== 'm')
                                    ?
                                    (
                                        <DisplayWeapon
                                            key={wg.wgID}
                                            weaponGroup={wg}
                                            weapons={weapons.filter(weapon => (weapon.wType === wg.wgType))}
                                            char={char}
                                            dispatchChar={dispatchChar}
                                        />
                                    )
                                    :
                                    ""
                            )
                            return jsx
                        })
                    }
                </span>
            }

            {
                weaponGroups.filter(wg => wg.wgType === 'u' || wg.wgType === 'm').length > 0
                &&
                <span>Your character is proficient with {returnsUnarmedTitleText({ array: weaponGroups, titlePrefix: 'wg', removeArray: ['Ranged', 'Powerful Claw', 'Shield', 'Improvised', 'Heavy Melee', 'Light Melee'] })} attacks</span>
            }
            {
                weaponGroups.length > 0
                &&
                weapons.length > 0
                &&
                <span>

                    {
                        weaponGroups.map(wg => {

                            const jsx = (
                                wg.wgType === 'u'
                                    ?
                                    (
                                        <DisplayUnarmed
                                            key={wg.wgID}
                                            weaponGroup={wg}
                                            weapons={weapons.filter(weapon => (weapon.wType === wg.wgType))}
                                            char={char}
                                            dispatchChar={dispatchChar}
                                        />
                                    )
                                    :
                                    wg.wgType === 'm'
                                        ?
                                        <DisplayMagicRanged
                                            key={wg.wgID}
                                            weaponGroup={wg}
                                            weapons={weapons.filter(weapon => (weapon.wType === wg.wgType))}
                                            char={char}
                                            dispatchChar={dispatchChar}
                                        />
                                        :
                                        ""
                            )
                            return jsx
                        })
                    }
                </span>
            }
            <DisplayRational />
        </div>
    )
}

export default CharWeapon