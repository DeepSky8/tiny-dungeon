import React from "react";
import returnsWeaponTitleText from "../../functions/returnsWeaponTitleText";
import DisplayUnarmed from "./DisplayUnarmed";
import DisplayWeapon from "./DisplayWeapon";
import alphabetizeTitles from "../../functions/alphabetizeTitles";

const DisplayWeapons = ({ char, dispatchChar }) => {
    const { weaponGroupObjects: weaponGroups, weaponObjects: weapons } = char
    const sortedWeaponGroups = alphabetizeTitles({ objectArray: weaponGroups, titlePrefix: 'wg' })

    return (
        <div className="charWeapon__container">
            <div
                className="charWeapon__text"
                id="charWeapon__text"
            >
                Your character is proficient with {returnsWeaponTitleText({ array: sortedWeaponGroups, titlePrefix: 'wg', removeArray: ['Unarmed'] })} weapons
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
                                    (
                                        <DisplayWeapon
                                            key={wg.wgID}
                                            weaponGroup={wg}
                                            weapons={weapons.filter(weapon => (weapon.wType === wg.wgType))}
                                            char={char}
                                            dispatchChar={dispatchChar}
                                        />
                                    )
                            )
                            return jsx
                        })
                    }
                </span>
            }
        </div>
    )
}

export default DisplayWeapons