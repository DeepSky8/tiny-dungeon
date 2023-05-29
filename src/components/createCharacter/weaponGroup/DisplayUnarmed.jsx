import React, { useEffect, useReducer, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { defaultWeaponMastered, weaponsMasteredReducer } from "../../../reducers/weaponReducer";
import {
    loadWeapon,
    updateWDescription,
    updateWHTrait,
    updateWTitle,
    updateWTrait,
} from "../../../actions/weaponActions";
import Field from "../../display/Field";
import { addWeaponIDObject } from "../../../actions/charActions";


const DisplayUnarmed = ({ weaponGroup: wG, weapons, dispatchChar }) => {
    const [wgName,] = useState(wG.wgTitle); // Will always be Unarmed
    const [newWeapon, dispatchNewWeapon] = useReducer(weaponsMasteredReducer, defaultWeaponMastered)
    const [savedWeapon, setSavedWeapon] = useLocalStorageState(newWeapon.wID)
    const [show, setShow] = useState(false)

    const martialArtist = {
        wID: 'martialArtist',
        // wGroup: '',          // Select from weapon type array determined by group, identify by ID
        wType: 'u',              // Corresponds to weaponGroup letter
        wTitle: 'Name your strike', // User-defined text
        wDescription: '',       // User-defined text, if any
        wDepletion: 99,          // Interact with depletion counters in later update, set initial depletion counters by wType object
        wHTrait: false,         // Set by Heritage
        wTrait: false,          // Set by Trait
    }

    const handleSaveWeapon = () => {
        dispatchChar(addWeaponIDObject({ wID: newWeapon.wID, wType: wG.wgType }))
        setSavedWeapon(newWeapon)
    }

    useEffect(() => {
        if (wG.wgHTrait) {
            const heritageWeapons = weapons.filter(weapon => weapon.wHTrait)
            const matchesWeaponGroup = heritageWeapons.filter(weapon => weapon.wType === wG.wgType)
            dispatchNewWeapon(loadWeapon(matchesWeaponGroup[0]))

        } else {
            dispatchNewWeapon(loadWeapon(martialArtist))
            dispatchNewWeapon(updateWHTrait(wG.wgHTrait)) // Set by Heritage Trait: boolean
            dispatchNewWeapon(updateWTrait(wG.wgTrait))   // Set by Trait: boolean
        }
    }, [])



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

                        {newWeapon.wID &&
                            <div className="displayWeapon__container--edit">
                                {
                                    !weapons.map(weapon => weapon.wID).includes(newWeapon.wID)
                                    &&
                                    <Field
                                        label={'Strike name: '}
                                        id={'title'}
                                        type={'text'}
                                        placeholder="Crane Beak?"
                                        value={newWeapon.wTitle}
                                        change={(e) => {
                                            dispatchNewWeapon(updateWTitle(e.target.value))
                                        }}
                                        blur={() => {
                                            handleSaveWeapon()
                                        }}
                                        theme={''}
                                    />
                                }

                                <Field
                                    label={'Description: '}
                                    id={'description'}
                                    type={'textarea'}
                                    placeholder="What does it look like?"
                                    value={newWeapon.wDescription}
                                    change={(e) => {
                                        dispatchNewWeapon(updateWDescription(e.target.value))
                                    }}
                                    blur={() => {
                                        handleSaveWeapon()
                                    }}
                                    theme={''}
                                />

                                <div className="clickOpen__text--reminder">
                                    Tap text to edit
                                </div>

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
                        }
                    </div>
                }

            </div>
        </div>
    )
}

export default DisplayUnarmed