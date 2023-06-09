import React from "react";
import DisplayUnarmed from "./DisplayUnarmed";
import DisplayWeapon from "./DisplayWeapon";
import alphabetizeTitles from "../../functions/alphabetizeTitles";
import TapOpen from "../TapOpen";
import DisplayRational from "../createCharacter/DisplayRational";
import returnsTitleText from "../../functions/returnsTitleText";

const DisplayWeapons = ({ char, dispatchChar }) => {
    const { weaponGroupObjects: weaponGroups, weaponObjects: weapons } = char
    const sortedWeaponGroups = alphabetizeTitles({ objectArray: weaponGroups, titlePrefix: 'wg' })
    // const notWeapons = ['Unarmed', 'Powerful Claw', 'Magical Ranged']
    // const areWeapons = ['Ranged', 'Shield', 'Improvised', 'Heavy Melee', 'Light Melee']

    return (
        <div className="displayWeapons__container">
        <div className="charSheet__display--title centered bold">Weapons</div>
            <div className="displayWeapons__text">
                {
                    sortedWeaponGroups.length > 0
                    &&
                    <div
                        className="centered"
                    >{char.charName} is proficient with {returnsTitleText({
                        array1: sortedWeaponGroups.filter(title => (title.wgType !== 'u' && title.wgType !== 'm')),
                        array2: sortedWeaponGroups.filter(title => (title.wgType === 'u' || title.wgType === 'm')),
                        titlePrefix: 'wg',
                    })}
                    </div>

                }

            </div>


            {
                sortedWeaponGroups.length > 0
                &&
                weapons.length > 0
                &&
                <div
                    className="displayWeapons__container--weapons"
                >
                    <TapOpen />
                    {
                        sortedWeaponGroups.map(wg => {
                            const jsx = (
                                (wg.wgType !== 'u')
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
                                    (
                                        <DisplayUnarmed
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
                </div>
            }

            <DisplayRational
                stage="weapon"
            />

        </div>
    )
}

export default DisplayWeapons