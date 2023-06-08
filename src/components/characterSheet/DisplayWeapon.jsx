import React, { useReducer, useState } from "react";
import { defaultWeaponMastered, weaponsMasteredReducer } from "../../reducers/weaponReducer";
import { updateWDescription } from "../../actions/weaponActions";
import Field from "../display/FieldPencil";
import { addWeaponObject } from "../../actions/charActions";

const DisplayWeapon = ({ weaponGroup: wG, char, dispatchChar }) => {
    const [wgName,] = useState(wG.wgTitle);
    const weaponMatch = (char.weaponObjects.find(wO => wO.wType === wG.wgType))
    const [weapon, dispatchWeapon] = useReducer(weaponsMasteredReducer, (weaponMatch === undefined ? defaultWeaponMastered : weaponMatch))
    const [show, setShow] = useState(false)

    // const otherWeapon = {
    //     wID: `custom${wG.wgType}`,
    //     wCharID: char.charID,
    //     wType: wG.wgType,       // Corresponds to weaponGroup letter
    //     wTitle: '',             // User-defined text
    //     wDescription: '',       // User-defined text
    //     wDepletion: 6,          // Interact with depletion counters in later update, set initial depletion counters by wType object
    //     wHTrait: wG.wgHTrait,   // Set by Heritage
    //     wTrait: wG.wgTrait,     // Set by Trait
    // }

    const handleSaveWeapon = () => {
        dispatchChar(addWeaponObject(weapon))
    }

    // useEffect(() => {
    //     if (wG.wgHTrait && !weaponMatch) {
    //         const heritageWeapons = weapons.filter(weapon => weapon.wHTrait)
    //         const matchesWeaponGroup = heritageWeapons.find(weapon => weapon.wType === wG.wgType)
    //         dispatchNewWeapon(loadWeapon(matchesWeaponGroup))
    //         handleSaveWeapon(matchesWeaponGroup)
    //     }
    // }, [])

    const rangeName = (range) => {
        switch (range) {
            case 'c':
                return 'Close';
            case 'n':
                return 'Near';
            case 'f':
                return 'Far';
            default:
                break;
        }
    }

    // const selectWeapon = (weapon) => {
    //     if (weapons.map(weapon => weapon.wID).includes(weapon.wID)) {
    //         dispatchNewWeapon(loadWeapon(weapon))
    //     } else if (weapon.wID === otherWeapon.wID) {
    //         dispatchNewWeapon(loadWeapon(otherWeapon))
    //     }
    //     handleSaveWeapon(weapon)
    // }

    return (
        <div className="displayWeapon__container">
            <div
                className="displayWeapon__heading--clickable"
                onClick={() => {
                    setShow(!show)
                }}
            >
                <div
                    className="displayWeapon__heading--title"
                >
                    {wgName}
                </div>
            </div>

            <div className="displayWeapon__container--body">
                {show &&
                    <div className="displayWeapon__container--pick">

                        <div className="sMenu__container">
                            <div className="sMenu__button">
                                {weapon.wTitle}
                            </div>
                        </div>

                        <div className="displayWeapon__container--spacer">
                            <div className="displayWeapon__container--edit">
                                <Field
                                    label={'Description: '}
                                    id={'description'}
                                    type={'textarea'}
                                    placeholder="What does it look like?"
                                    value={weapon.wDescription}
                                    change={(e) => {
                                        dispatchWeapon(updateWDescription(e.target.value))
                                    }}
                                    blur={() => {
                                        handleSaveWeapon()
                                    }}
                                    theme={''}
                                />

                                <div>Attacks per turn: {wG.wgAttackTurn}</div>
                                <div>Damage per attack: {wG.wgDamage}</div>

                                <div className="displayWeapon__container--range">
                                    <div className="displayWeapon__range--regular">
                                        <div className="displayWeapon__range--title">
                                            Normal Attack Range:
                                        </div>

                                        <ul className="displayWeapon__range--body">
                                            {wG.wgRangeIDs.map((range) => {
                                                return (
                                                    <li
                                                        key={range + Math.random()}
                                                    >
                                                        {rangeName(range)}
                                                    </li>
                                                )
                                            })}
                                        </ul>

                                    </div>
                                    {
                                        wG.wgDisRangeIDs
                                        &&
                                        (
                                            <div className="displayWeapon__range--disadvantage">
                                                <div className="displayWeapon__range--title">
                                                    Disadvantaged Range:
                                                </div>

                                                <ul className="displayWeapon__range--body">
                                                    {wG.wgDisRangeIDs.map((range) => {
                                                        return (
                                                            <li
                                                                key={range + Math.random()}
                                                            >
                                                                {rangeName(range)}
                                                            </li>
                                                        )
                                                    })}
                                                </ul>

                                            </div>
                                        )

                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default DisplayWeapon

// {
//     !weapons.map(weapon => weapon.wID).includes(weapon.wID)
//     &&
//     <Field
//         label={'Weapon Name: '}
//         id={'title'}
//         type={'text'}
//         placeholder="Dagger? Poleaxe?"
//         value={weapon.wTitle}
//         change={(e) => {
//             dispatchWeapon(updateWTitle(e.target.value))
//         }}
//         blur={() => {
//             handleSaveWeapon()
//         }}
//         theme={''}
//     />
// }