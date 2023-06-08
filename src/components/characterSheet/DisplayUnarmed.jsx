import React, { useReducer, useState } from "react";
import { weaponsMasteredReducer } from "../../reducers/weaponReducer";
import {
    updateWDescription,
    updateWTitle,
} from "../../actions/weaponActions";
import Field from "../display/FieldPencil";
import { addWeaponObject } from "../../actions/charActions";

const DisplayUnarmed = ({ weaponGroup: wG, weapons, char, dispatchChar }) => {
    const [wgName,] = useState(wG.wgTitle); // Will always be Unarmed
    const weaponMatch = (char.weaponObjects.find(wO => wO.wType === wG.wgType))

    // const martialArtist = {
    //     wID: 'martialArtist',
    //     wCharID: char.charID,
    //     wType: 'u',             // Corresponds to weaponGroup letter
    //     wTitle: '',             // User-defined text
    //     wDescription: '',       // User-defined text, if any
    //     wDepletion: 99,         // Interact with depletion counters in later update, set initial depletion counters by wType object
    //     wHTrait: wG.wgHTrait,   // Set by Heritage
    //     wTrait: wG.wgTrait,     // Set by Trait
    // }
    const [weapon, dispatchWeapon] = useReducer(weaponsMasteredReducer, (weaponMatch === undefined ? martialArtist : weaponMatch))
    const [show, setShow] = useState(false)

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

                        {weapon.wID &&
                            <div className="displayWeapon__container--edit">
                                <div className="displayWeapon__container--spacer">
                                    <Field
                                        label={'Signature Strike: '}
                                        id={'title'}
                                        type={'text'}
                                        placeholder="Crane Beak?"
                                        value={weapon.wTitle}
                                        change={(e) => {
                                            dispatchWeapon(updateWTitle(e.target.value))
                                        }}
                                        blur={() => {
                                            handleSaveWeapon()
                                        }}
                                        theme={''}
                                    />

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
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default DisplayUnarmed