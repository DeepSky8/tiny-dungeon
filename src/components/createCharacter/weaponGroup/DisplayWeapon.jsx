import React, { useEffect, useReducer, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { defaultWeaponMastered, weaponsMasteredReducer } from "../../../reducers/weaponReducer";
import { loadWeapon, updateWDescription, updateWGroup, updateWHTrait, updateWID, updateWTitle, updateWTrait, updateWType } from "../../../actions/weaponActions";
import Field from "../../display/Field";
import { addWeaponIDObject } from "../../../actions/charActions";
import StyledMenu from "../../display/StyledMenu";

const weaponID = (wG, char, weapons) => {
    const heritageWeaponID = (
        wG.wgHTrait
            ?
            (weapons
                .filter(weapon => weapon.wHTrait)
                .find(weapon => weapon.wType === wG.wgType))
                .wID
            :
            false
    )

    console.log('heritageWeaponID - weapon', heritageWeaponID)

    const wIDObject = (char.weaponIDObjects.find(wIDO => wIDO.wType === wG.wgType))

    console.log('wID - weapon', wIDObject)

    if (heritageWeaponID) {
        return heritageWeaponID
    } else if (wIDObject) {
        return wIDObject.wID
    } else {
        return 'temp'
    }
}


const DisplayWeapon = ({ weaponGroup: wG, weapons, char, dispatchChar }) => {
    const [wgName,] = useState(wG.wgTitle);
    const localWeaponID = weaponID(wG, char, weapons)
    const [localWeapon, setLocalWeapon] = useLocalStorageState(localWeaponID, { defaultValue: defaultWeaponMastered })
    const [newWeapon, dispatchNewWeapon] = useReducer(weaponsMasteredReducer, (localWeaponID === 'temp' ? defaultWeaponMastered : localWeapon))
    const [show, setShow] = useState(false)

    const otherWeapon = {
        wID: `custom${wG.wgType}`,
        wCharID: char.charID,
        // wGroup: '',          // Select from weapon type array determined by group, identify by ID
        wType: '',              // Corresponds to weaponGroup letter
        wTitle: 'Add your own', // User-defined text, if any
        wDescription: '',       // User-defined text, if any
        wDepletion: 6,          // Interact with depletion counters in later update, set initial depletion counters by wType object
        wHTrait: false,         // Set by Heritage
        wTrait: false,          // Set by Trait
    }

    useEffect(() => {
        if (wG.wgHTrait) {
            const heritageWeapons = weapons.filter(weapon => weapon.wHTrait)
            const matchesWeaponGroup = heritageWeapons.find(weapon => weapon.wType === wG.wgType)
            setLocalWeapon(matchesWeaponGroup)
            dispatchNewWeapon(loadWeapon(matchesWeaponGroup))
            dispatchChar(addWeaponIDObject({ wID: matchesWeaponGroup.wID, wType: matchesWeaponGroup.wType }))
        }
    }, [])

    const handleSaveWeapon = () => {
        dispatchChar(addWeaponIDObject({ wID: newWeapon.wID, wType: wG.wgType }))
        setLocalWeapon(newWeapon)
    }

    useEffect(() => {
        if (weapons.map(weapon => weapon.wID).includes(newWeapon.wID)) {
            const newWeaponObject = weapons.find(weapon => weapon.wID === newWeapon.wID)
            dispatchNewWeapon(loadWeapon(newWeaponObject))
        } else if (newWeapon.wID === otherWeapon.wID) {
            dispatchNewWeapon(loadWeapon(otherWeapon))
            dispatchNewWeapon(updateWHTrait(wG.wgHTrait)) // Set by Heritage Trait: boolean
            dispatchNewWeapon(updateWTrait(wG.wgTrait))   // Set by Trait: boolean
            dispatchNewWeapon(updateWType(wG.wgType))     // Corresponds to weaponGroup letter
        }
    }, [newWeapon.wID])

    useEffect(() => {
        if (newWeapon.wID) {
            handleSaveWeapon()
        }

    }, [newWeapon])


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

                        {
                            !wG.wgHTrait
                            &&
                            <StyledMenu
                                menuID={'weaponMenu'}
                                selectStatement={'--Select a Weapon--'}
                                array={weapons.filter(weapon => !weapon.wHTrait).concat([otherWeapon])}
                                arrayIDRef={'wID'}
                                arrayTitleRef={'wTitle'}
                                state={newWeapon}
                                dispatchState={dispatchNewWeapon}
                                dispatchAction={updateWID}
                                stateIDRef={'wID'}
                                closeMenuArrayIDs={[]}
                            />
                        }

                        {
                            wG.wgHTrait
                            &&
                            <div className="sMenu__container">
                                <div className="sMenu__button">
                                    {newWeapon.wTitle}
                                </div>
                            </div>
                        }

                        {newWeapon.wID &&
                            <div className="displayWeapon__container--edit">
                                {
                                    !weapons.map(weapon => weapon.wID).includes(newWeapon.wID)
                                    &&
                                    <Field
                                        label={'Weapon Name: '}
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

export default DisplayWeapon