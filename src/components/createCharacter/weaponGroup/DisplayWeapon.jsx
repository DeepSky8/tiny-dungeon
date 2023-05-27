import React, { useEffect, useReducer, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { defaultWeaponMastered, weaponsMasteredReducer } from "../../../reducers/weaponReducer";
import { updateWDescription, updateWGroup, updateWHTrait, updateWTitle, updateWTrait, updateWType } from "../../../actions/weaponActions";
import Field from "../../display/Field";
import { updateWeaponIDs } from "../../../actions/charActions";



const DisplayWeapon = ({ weaponGroup: wG, dispatchChar }) => {
    const [newWeapon, dispatchNewWeapon] = useReducer(weaponsMasteredReducer, defaultWeaponMastered)
    const [savedWeapon, setSavedWeapon] = useLocalStorageState(newWeapon.wID)
    const [show, setShow] = useState(false)

    useEffect(() => {
        dispatchNewWeapon(updateWHTrait(wG.wgHTrait)) // Set by Heritage Trait: boolean
        dispatchNewWeapon(updateWTrait(wG.wgTrait))   // Set by Trait: boolean
        dispatchNewWeapon(updateWType(wG.wgType))     // Corresponds to weaponGroup letter

        if (wG.wgHTrait && wG.wgType === 'u') {
            dispatchNewWeapon(updateWTitle('Powerful Claw')) // If Unarmed heritage trait, it's Powerful Claws from Karhu
        } else {
            dispatchNewWeapon(updateWTitle(wG.wgTitle))   // Initially set by weaponGroup title
        }
        // dispatchNewWeapon(updateWGroup())
    }, [])

    const handleSaveWeapon = () => {
        dispatchChar(updateWeaponIDs(newWeapon.wID))
        setSavedWeapon(newWeapon)
    }

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

    useEffect(() => {
        console.log('wG', wG)
    }, [wG])

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
                    {newWeapon.wTitle}
                </div>
            </div>



            <div className="displayWeapon__container--body">
                {show &&
                    <div className="displayWeapon__container--edit">

                        <Field
                            label={newWeapon.wType === 'u' ? 'Strike type: ' : 'Weapon Name/Type: '}
                            id={'title'}
                            type={'text'}
                            placeholder="Dagger? Poleaxe?"
                            value={newWeapon.wTitle}
                            change={(e) => {
                                dispatchNewWeapon(updateWTitle(e.target.value))
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
        </div>
    )
}

export default DisplayWeapon