import React from "react";
import returnsWeaponTitleText from "../../functions/returnsWeaponTitleText";
import DisplayUnarmed from "./DisplayUnarmed";
import DisplayWeapon from "./DisplayWeapon";
import alphabetizeTitles from "../../functions/alphabetizeTitles";
import returnsUnarmedTitleText from "../../functions/returnsUnarmedTitleText";

const DisplayWeapons = ({ char, dispatchChar }) => {
    const { weaponGroupObjects: weaponGroups, weaponObjects: weapons } = char
    const sortedWeaponGroups = alphabetizeTitles({ objectArray: weaponGroups, titlePrefix: 'wg' })
    const notWeapons = ['Unarmed', 'Magical Ranged']
    const areWeapons = ['Ranged', 'Powerful Claw', 'Shield', 'Improvised', 'Heavy Melee', 'Light Melee']

    return (
        <div className="displayWeapons__container">

            <div className="displayWeapons__section--weapon">
                <div
                    className="displayWeapons__text"
                    id="displayWeapons__text"
                >

                    {
                        sortedWeaponGroups.filter(wg => wg.wgType !== 'u' && wg.wgType !== 'm').length > 0
                        &&
                        <div
                            className="centered"
                        >{char.charName} is proficient with {returnsWeaponTitleText({ array: sortedWeaponGroups, titlePrefix: 'wg', removeArray: notWeapons })} weapons
                        </div>

                    }

                </div>

                <div className="clickOpen__text--reminder">
                    Click to open
                </div>
                {
                    sortedWeaponGroups.length > 0
                    &&
                    weapons.length > 0
                    &&
                    <span>

                        {
                            sortedWeaponGroups.map(wg => {
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
            </div>

            <div className="displayWeapons__section--nonweapon">

                <div className="clickOpen__text--reminder">
                    Click to open
                </div>
                {
                    sortedWeaponGroups.filter(wg => wg.wgType === 'u' || wg.wgType === 'm').length > 0
                    &&
                    <div
                        className="centered"
                    >{char.charName} is proficient with {returnsUnarmedTitleText({ array: sortedWeaponGroups, titlePrefix: 'wg', removeArray: areWeapons })} attacks</div>
                }
                {
                    sortedWeaponGroups.length > 0
                    &&
                    weapons.length > 0
                    &&
                    <span>

                        {
                            sortedWeaponGroups.map(wg => {

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
                                            <DisplayWeapon
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
            </div>
        </div>
    )
}

export default DisplayWeapons

// <div
//                 className="displayWeapons__text"
//                 id="displayWeapons__text"
//             >
//                 Your character is proficient with {returnsWeaponTitleText({ array: sortedWeaponGroups, titlePrefix: 'wg', removeArray: ['Unarmed'] })} weapons
//             </div>
//             <div className="clickOpen__text--reminder">
//                 Click to open
//             </div>
//             {
//                 sortedWeaponGroups.length > 0
//                 &&
//                 weapons.length > 0
//                 &&
//                 <span>
//                     {
//                         sortedWeaponGroups.map(wg => {
//                             const jsx = (
//                                 wg.wgType === 'u'
//                                     ?
//                                     (
//                                         <DisplayUnarmed
//                                             key={wg.wgID}
//                                             weaponGroup={wg}
//                                             weapons={weapons.filter(weapon => (weapon.wType === wg.wgType))}
//                                             char={char}
//                                             dispatchChar={dispatchChar}
//                                         />
//                                     )
//                                     :
//                                     (
//                                         <DisplayWeapon
//                                             key={wg.wgID}
//                                             weaponGroup={wg}
//                                             weapons={weapons.filter(weapon => (weapon.wType === wg.wgType))}
//                                             char={char}
//                                             dispatchChar={dispatchChar}
//                                         />
//                                     )
//                             )
//                             return jsx
//                         })
//                     }
//                 </span>
//             }